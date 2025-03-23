import { uploadPDF } from "../controllers/pdf.controller.js";
import upload from "../middleware/pdf.middleware.js";
import express from "express"

const router=express.Router()

router.post("/upload", upload.single("file"), uploadPDF);

export default router