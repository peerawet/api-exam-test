import { Router } from "express";
import supabase from "../utills/supabase.js";

export const employeesRouter = Router();

employeesRouter.get("/get-employee-kpi", async (req, res) => {
  try {
    // Extract department-id query parameter
    const departmentIds =
      req.query["department-id"]?.toString().split(",") || [];

    // Construct the query
    let { data, error } = await supabase
      .from("employees")
      .select("*, departments(name, departmental_kpi)")
      .in("department_id", departmentIds);

    if (error) {
      throw new Error(error.message);
    }

    // Send JSON response
    res.status(200).json(data);
  } catch (error) {
    // Handle any exceptions
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
