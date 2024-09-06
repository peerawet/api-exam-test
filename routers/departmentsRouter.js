import { Router } from "express";
import supabase from "../utills/supabase.js";

export const departmentsRouter = Router();

departmentsRouter.get("/get-department", async (req, res) => {
  try {
    const { data, error } = await supabase.from("departments").select("*");

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching departments:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
