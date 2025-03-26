import passport from "passport";

import { Strategy as GitHubStrategy } from "passport-github2";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      callbackURL: "http://localhost:4000/api/auth/callback/github",
    },

    function (accessToken, refreshToken, profile, done) {
      return done(errorCodes, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

export default passport;
