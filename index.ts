import express from "express";
import { checkConn, sequelize } from "./dbconection/dbconnection";
import { Job } from "./model/jobModel";
import dotenv from "dotenv";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
checkConn();

app.get("/", (req, res) => {
  const htmlMessage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to CRUD API</title>
    </head>
    <body>
        <h1>Welcome to CRUD API using MySQL and Node.js (using Typescript)!</h1>
        <h2>Available Endpoints:</h2>
        <ul>
            <li><strong>POST /api/jobs</strong>: Create a new job posting (e.g., title, company, location, salary, description).</li>
            <li><strong>GET <a href="http://localhost:4000/api/jobs">/api/jobs</a></strong>: Retrieve all job postings.</li>
            <li><strong>GET /api/jobs/:id</strong>: Retrieve a single job posting by ID.</li>
            <li><strong>PUT /api/jobs/:id</strong>: Update a job posting by ID.</li>
            <li><strong>DELETE /api/jobs/:id</strong>: Delete a job posting by ID.</li>
        </ul>
    </body>
    </html>
  `;
  res.send(htmlMessage);
});

app
  .route("/api/jobs")
  //GET /api/jobs -> Retrieve all postings.
  .get(async (req, res) => {
    try {
      const jobs = await Job.findAll();
      res.json(jobs);
    } catch (error) {
      console.log(error);
    }
  })
  //POST /api/jobs -> Create a new job posting (e.g., title, company, location, salary, description).
  .post(async (req, res): Promise<void> => {
    const jobs = req.body;
    if (!jobs) {
      res.status(400).json({ error: "No jobs data provided" });
      return;
    }
    try {
      const jobsToCreate = Array.isArray(jobs) ? jobs : [jobs];
      const newJobs = await Job.bulkCreate(jobsToCreate);
      res.status(201).json(newJobs);
    } catch (error) {
      console.error("Error creating jobs:", error);
      res.status(500).json({ error: "Error creating jobs" });
    }
  });

app
  .route("/api/jobs/:id")
  //GET /api/jobs/:id -> Retrieve a single posting by ID.
  .get(async (req, res) => {
    const id = req.params.id;
    try {
      const job = await Job.findOne({
        where: {
          id: id,
        },
      });
      res.json(job);
    } catch (error) {
      console.log(error);
    }
  })
  //DELETE /api/jobs/:id -> Delete a posting by ID.
  .delete(async (req, res) => {
    const id = req.params.id;
    try {
      const deletedJob = await Job.destroy({
        where: {
          id: id,
        },
      });
      res.json(deletedJob);
    } catch (error) {
      console.log(error);
    }
  })
  //PUT /api/jobs/:id -> Update a posting by ID.
  .put(async (req, res): Promise<void> => {
    const id = req.params.id;
    const { job_title, company, location, salary, description } = req.body;
    try {
      const [updatedJob] = await Job.update(
        { job_title, company, location, salary, description },
        { where: { id: id } }
      );
      if (updatedJob) {
        const updatedJob = await Job.findOne({ where: { id: id } });
        res.status(200).json(updatedJob);
      } else {
        res.status(404).json({ error: `Job with id ${id} not found` });
      }
    } catch (error) {
      console.log(error);
    }
  });

app.listen(PORT, () => {
  console.log(
    "The application is listening " + "on port http://localhost:" + PORT
  );
});
