"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbconnection_1 = require("./dbconection/dbconnection");
const jobModel_1 = require("./model/jobModel");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
(0, dbconnection_1.checkConn)();
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
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield jobModel_1.Job.findAll();
        res.json(jobs);
    }
    catch (error) {
        console.log(error);
    }
}))
    //POST /api/jobs -> Create a new job posting (e.g., title, company, location, salary, description).
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = req.body;
    if (!jobs) {
        res.status(400).json({ error: "No jobs data provided" });
        return;
    }
    try {
        const jobsToCreate = Array.isArray(jobs) ? jobs : [jobs];
        const newJobs = yield jobModel_1.Job.bulkCreate(jobsToCreate);
        res.status(201).json(newJobs);
    }
    catch (error) {
        console.error("Error creating jobs:", error);
        res.status(500).json({ error: "Error creating jobs" });
    }
}));
app
    .route("/api/jobs/:id")
    //GET /api/jobs/:id -> Retrieve a single posting by ID.
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const job = yield jobModel_1.Job.findOne({
            where: {
                id: id,
            },
        });
        res.json(job);
    }
    catch (error) {
        console.log(error);
    }
}))
    //DELETE /api/jobs/:id -> Delete a posting by ID.
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedJob = yield jobModel_1.Job.destroy({
            where: {
                id: id,
            },
        });
        res.json(deletedJob);
    }
    catch (error) {
        console.log(error);
    }
}))
    //PUT /api/jobs/:id -> Update a posting by ID.
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { job_title, company, location, salary, description } = req.body;
    try {
        const [updatedJob] = yield jobModel_1.Job.update({ job_title, company, location, salary, description }, { where: { id: id } });
        if (updatedJob) {
            const updatedJob = yield jobModel_1.Job.findOne({ where: { id: id } });
            res.status(200).json(updatedJob);
        }
        else {
            res.status(404).json({ error: `Job with id ${id} not found` });
        }
    }
    catch (error) {
        console.log(error);
    }
}));
app.listen(PORT, () => {
    console.log("The application is listening " + "on port http://localhost:" + PORT);
});
