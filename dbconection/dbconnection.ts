import { Sequelize } from "sequelize-typescript";
import { Job } from "../model/jobModel";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "mysql",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  models: [Job],
  logging: false,
});

const checkConn = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, checkConn };
