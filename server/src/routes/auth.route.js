import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/callback/github",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:5173",
    successRedirect: "http://localhost:5173/dashboard",
  })
);

router.get("/profile",(req,res)=>{
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }
  return res.status(401).json({ message: 'Unauthorized' });
}
)
export default router;
