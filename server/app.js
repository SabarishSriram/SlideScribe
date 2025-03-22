
const express = require("express");
const cors = require("cors");
const pdfRoutes = require("./src/routes/pdf.routes");
require("dotenv").config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", pdfRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} 🚀✨`);
});

