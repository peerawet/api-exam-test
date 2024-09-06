import { Router } from "express";
import supabase from "../utills/supabase.js";

// Initialize the router
export const transactionsRouter = Router();

transactionsRouter.post("/create", async (req, res) => {
  try {
    // Extract data from the request body
    const { prefix, firstName, lastName, birthDate, profileImage } = req.body;
    console.log("Request body:", req.body);

    // Input validation
    if (!firstName || !lastName || !birthDate) {
      return res.status(400).json({
        error: "All fields (firstName, lastName, birthDate) are required.",
      });
    }

    // Validate profile image if provided
    let profileImageUrl = null;
    if (profileImage) {
      // Simple validation for Base64 string (this is optional)
      if (!/^data:image\/(jpeg|png);base64,/.test(profileImage)) {
        return res.status(400).json({
          error: "Invalid profile image format.",
        });
      }
      profileImageUrl = profileImage; // Use the Base64 string as is
    }

    // Insert new record into the database
    const { data, error } = await supabase.from("transactions").insert([
      {
        prefix: prefix,
        first_name: firstName,
        last_name: lastName,
        birth_date: new Date(birthDate).toISOString(),
        created_at: new Date().toISOString(), // Use current timestamp
        updated_at: new Date().toISOString(), // Use current timestamp
        profile_image: profileImageUrl, // Save Base64 string in the database
      },
    ]);

    // Handle database error
    if (error) {
      console.error("Database error:", error); // Log the error
      return res.status(500).json({ error: error.message });
    }

    // Return success response
    return res.status(200).json({
      message: "Transaction created successfully.",
    });
  } catch (err) {
    console.error("Unexpected error:", err); // Log the unexpected error
    return res.status(500).json({ error: "Something went wrong." });
  }
});

transactionsRouter.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("transactions").select("*"); // Fetch all columns

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      message: "Transactions fetched successfully.",
      transactions: data,
    });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong." });
  }
});

transactionsRouter.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { prefix, first_name, last_name, birth_date, profile_image } =
      req.body;
    console.log(req.body);

    // Input validation
    if (!prefix || !first_name || !last_name || !birth_date) {
      return res.status(400).json({
        error:
          "All fields (prefix, first_name, last_name, birth_date) are required.",
      });
    }

    // Update record in the database
    const { data, error } = await supabase
      .from("transactions")
      .update({
        prefix,
        first_name,
        last_name,
        birth_date: new Date(birth_date).toISOString(),
        profile_image: profile_image,

        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    // Handle database error
    if (error) {
      console.error("Database error:", error);
      return res.status(500).json({ error: error.message });
    }

    // Return success response
    return res.status(200).json({
      message: "Transaction updated successfully.",
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

transactionsRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    // Delete the record from the database
    const { data, error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    // Handle database error
    if (error) {
      console.error("Database error:", error); // Log the error
      return res.status(500).json({ error: error.message });
    }

    // Return success response
    return res.status(200).json({
      message: "Transaction deleted successfully.",
    });
  } catch (err) {
    console.error("Unexpected error:", err); // Log the unexpected error
    return res.status(500).json({ error: "Something went wrong." });
  }
});
