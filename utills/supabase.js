import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = 'https://zktsxumtyerxtskmazsk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprdHN4dW10eWVyeHRza21henNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4ODc0MDYsImV4cCI6MjAzNjQ2MzQwNn0.lB9X4Z_a2W4fkOvbTVD81q-AP4Tlde_IrC88CKqAIBw';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
