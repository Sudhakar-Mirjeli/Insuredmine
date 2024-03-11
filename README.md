Project Name: Insuredmine API's

**About**
Hi, I'm sudhakar Mirjeli having 3 years of work experience in software development, I have built project InsuredMine Api's.

**Description**
This project implements a set of APIs for insurance-related operations, including bulk upload of CSV data, searching for policies by username, providing aggregated policy information for each user, tracking real-time CPU utilization of the node server, and creating a post-service to insert messages into the database at specified dates and times.
Features

    Bulk Upload API: Allows users to upload CSV data using Node.js worker threads for efficient processing.
    Search API: Enables users to search for policies by username, providing quick access to policy information.
    Aggregated Policy API: Provides aggregated policy information for each user, enhancing reporting capabilities.
    CPU Utilization Monitoring: Tracks real-time CPU utilization of the node server and automatically restarts the server at 70% usage to maintain optimal performance.
    Post-Service: Inserts messages into the database at specified dates and times, facilitating scheduled messages by using Agenda schedulers.

**Technologies Used**
    Node.js
    MongoDB
    Worker Threads
    Agenda Schedulers
    osUtils

**Installation**
    Clone the repository: git clone <url>
    Install dependencies: npm install
    Start the server: npm run start-watch

Usage

    Bulk Upload API:
        Endpoint: `/api/upload-file-data`
        Method: POST
        Parameters: CSV file
        Example: curl -X POST -F 'file=@data.csv' http://localhost:5058/api/upload-file-data

    Search API: 
        Endpoint:`/api/policyInfo?userName=<name>` 
        Method: GET
        Parameters: userName
        Example: curl http://localhost:5058/api/policyInfo?userName=Renea 

    Aggregated Policy API:
        Endpoint: `/api/policyInfo` 
        Method: GET
        Example: curl http://localhost:5058/api/policyInfo

    Post-Service:
        Endpoint: /api/schedule-messages`
        Method: POST
        Body: message, day, time
        Example: curl -X POST -H 'Content-Type: application/json' -d '{"message": "Hello", "day": "2024-03-12", "time": "10:00"}'



**Contact**
    Sudhakar Mirjeli
    Email: sudhakarmirjeli@gmail.com
    LinkedIn:https://www.linkedin.com/in/sudhakar-mirjeli-04a47b226/
