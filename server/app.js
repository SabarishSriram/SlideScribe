
import express from "express";
import cors from "cors";
import { loadAuth } from "./src/routes/auth.route.js";
import pdfroutes from "./src/routes/pdf.route.js"

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api", pdfroutes);

app.use(loadAuth)

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} 🚀✨`);
});

