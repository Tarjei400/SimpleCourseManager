import { server } from "./app"
import passport from "passport"
import session from "express-session";
import { User } from "mongo/models/User";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt-nodejs";

server.use(
    session({
        secret: 'mySecretKey'
    })
);

server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false, 'Invalid Credentials, no user'); }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, 'Invalid credentials. hash doesnt match');
        });

    });
}));

export async function signup({ name, email, password }, req) {
    const user = new User({ name, email, password });
    if (!email || !password) { throw new Error('You must provide an email and password.'); }

    let existingUser = await User.findOne({ email });
    if (existingUser) { throw new Error('Email in use'); }
    await user.save();
    return await login({ email, password }, req);;
}

export function login({ email, password }, req) {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user) => {
            if (!user) { reject('Invalid credentials.') }

            req.login(user, () => resolve(user));
        })({ body: { email, password } });
    });
}