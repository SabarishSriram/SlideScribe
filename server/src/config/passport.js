import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import prisma from "./prisma.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      callbackURL: "http://localhost:4000/api/auth/callback/google",
      scope: ["user"],
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      try {
        let user = await prisma.user.findUnique({
          where: { id:profile.id },
        });

        // If not, create a new user
        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email: profile.emails?.[0].value,
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

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      callbackURL: "http://localhost:4000/api/auth/callback/github",
      scope: ["user", "user:email"],
    },

    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        let user = await prisma.user.findUnique({
          where: { id: profile.id },
        });

        // If not, create a new user
        if (!user) {
          user = await prisma.user.create({
            data: {
              name: profile.displayName,
              email: profile.emails?.[0].value,
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

passport.deserializeUser(async (id, done) => {
  try {
    // Fetch the full user data using the ID stored in the session
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    done(null, user); // Now req.user will contain the full user object
  } catch (error) {
    done(error); // Handle errors appropriately
  }
});

export default passport;
