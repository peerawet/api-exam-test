import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = 'https://sbufizsgixajpcipnyuj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNidWZpenNnaXhhanBjaXBueXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2MjM2NzMsImV4cCI6MjA0MTE5OTY3M30.SC-TEsg50KhJxJUk4wRXBTLAdOpOZDjsqTChHnij2ig';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
