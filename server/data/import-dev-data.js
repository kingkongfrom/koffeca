const fs = require("fs");
const Coffee = require("../models/coffeeModel");
const { connect, connection } = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

const coffee = JSON.parse(fs.readFileSync(`${__dirname}/fixture.json`, "utf-8"));

const connectionToDatabase = async () => {
    try {
        connect(DB);
        console.log("Database connection successful");
    } catch (err) {
        console.error("Error connecting to database", err);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await Coffee.create(coffee);
        console.log("Data successfully loaded");
    } catch (err) {
        console.error("Error importing data: ", err);
        process.exit(1);
    }
    process.exit(0);
};

const deleteData = async () => {
    try {
        await Coffee.deleteMany();
        console.log("Data deleted successfully");
    } catch (err) {
        console.error("Error deleting data: ", err);
        process.exit(1);
    }
    process.exit(0);
};

const main = async () => {
    await connectionToDatabase();

    if (process.argv[2] === "--import") {
        await importData();
    }

    if (process.argv[2] === "--delete") {
        await deleteData();
    }
    await connection.close();
};

main().catch((err) => {
    console.error("An unexpected error occurred: ", err);
    process.exit(1);
});