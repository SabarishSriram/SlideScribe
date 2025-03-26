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
    failureRedirect: "/login",
    successRedirect: "/protected",
  })
);
export default router;
