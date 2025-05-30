import { isloggedin } from "../../app.js";
import {
  getAllNotes,
  getPDF,
  uploadPDF,
} from "../controllers/pdf.controller.js";
import upload from "../middleware/pdf.middleware.js";
import express from "express";

const router = express.Router();

router.post("/upload", isloggedin, upload.single("file"), uploadPDF);

router.get("/notes/:id", isloggedin, getPDF);

router.get("/allnotes/:userId", isloggedin, getAllNotes);

export default router;
