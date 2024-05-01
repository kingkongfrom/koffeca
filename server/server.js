const app = require("./app");
const dotenv = require("dotenv");
const { connect } = require("mongoose");

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

connect(DB).then(() => {
    console.log("Database connection successful");
});
