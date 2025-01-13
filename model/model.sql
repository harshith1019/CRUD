CREATE DATABASE nxtjob;

CREATE TABLE jobs (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    job_title VARCHAR(255),
    company VARCHAR(25),
    location VARCHAR(255),
    salary INT,
    description TEXT,
    date_posted DATE DEFAULT(NOW)
);