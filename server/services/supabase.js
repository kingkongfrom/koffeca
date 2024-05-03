const { createClient } = require("@supabase/supabase-js");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        await supabase;
    } catch (error) {
        console.error("Error connecting to Supabase:", error.message);
    }
}

module.exports = { supabase, testConnection };
