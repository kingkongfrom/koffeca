import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tferhpantilxkusofrfv.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmZXJocGFudGlseGt1c29mcmZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwMTA4MjIsImV4cCI6MjAyNTU4NjgyMn0.vB1LSeaP_CgqSiAhZkTZURjLZ4LMJXKCOIUIWY_MK9k";

const supabase = createClient(supabaseUrl, supabaseKey);

// Export the Supabase client directly
export default supabase;
