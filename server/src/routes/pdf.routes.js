const express = require("express");
const router = express.Router()
const { uploadPDF } = require("../controllers/pdf.controller");
const upload = require("../middleware/pdf.middleware");

router.post("/upload", upload.single("file"), uploadPDF);

module.exports = router;
