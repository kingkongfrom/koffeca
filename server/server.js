const app = require("./app");
const dotenv = require("dotenv");
const { connect } = require("mongoose");

const { testConnection } = require("./services/supabase");

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

const port = process.env.PORT;

app.listen(port, "0.0.0.0", () => {
  console.log(process.env.NODE_ENV);
  console.log(`App running on port ${port}...`);
});

connect(DB).then(() => {
  console.log("Database connection successful");
});

testConnection().then(() => {
  console.log("Successfully connected to Supabase!");
});
