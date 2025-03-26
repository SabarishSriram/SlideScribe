import express from "express";
import cors from "cors";
import pdfroutes from "./src/routes/pdf.route.js";
import passport from "./src/config/passport.js";
import authRoutes from "./src/routes/auth.route.js";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);

app.use("/api", pdfroutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT} 🚀✨`);
});
