import passport from "passport";

import { Strategy as GitHubStrategy } from "passport-github2";
import prisma from "./prisma.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      callbackURL: "http://localhost:4000/api/auth/callback/github",
      scope:['user','user:email']
    },

    async (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      try {
        let user = await prisma.user.findUnique({
          where: { id:profile.id},
        });

        // If not, create a new user
        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email: profile.emails?.[0].value ||"",
              image: profile.photos?.[0].value || "",
            },
          });
        }

        // Done with the user (calls serializeUser)
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id });
});

export default passport;
