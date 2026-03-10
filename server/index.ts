import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, "../client")));

// Fallback for any other requests to serve the index.html or handle routes
// Since this is a simple HTML site, we can just let express.static handle it
// but this ensures navigation works if someone hits a clean URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
