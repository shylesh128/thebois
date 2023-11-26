import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "GET") {
    // Handle GET request to read data.json
    const jsonFilePath = path.join(process.cwd(), "public", "users.json");

    fs.readFile(jsonFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        res.status(500).json({ error: "Failed to read JSON file" });
      } else {
        try {
          const jsonData = JSON.parse(data);
          res.status(200).json(jsonData);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          res.status(500).json({ error: "Failed to parse JSON data" });
        }
      }
    });
  } else if (req.method === "POST") {
    const jsonFilePath = path.join(process.cwd(), "public", "users.json");

    try {
      const credentials = req.body;
      const existingData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

      const user = existingData.find(
        (userData) => userData.email === credentials.email
      );

      if (user) {
        // Here you might want to compare passwords or perform other authentication checks
        // For simplicity, let's assume a successful login if the email exists

        res
          .status(200)
          .json({ message: "Login successful", user: { email: user } });
      } else {
        res.status(401).json({
          error: "Login failed. Email not found or invalid credentials.",
        });
      }
    } catch (readError) {
      console.error("Error reading JSON file:", readError);
      res.status(500).json({ error: "Failed to read JSON file" });
    }
  } else {
    res.status(404).json({ error: "Not Found" });
  }
}
