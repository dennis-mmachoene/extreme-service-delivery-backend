// ExpressService.js

import express from 'express';
import session from 'express-session';
import AuthService from './AuthService.js';

class ExpressService {
    static SECRET = process.env.SECRET || 'your-secret-key';
    static PORT = process.env.PORT || 3000;
    static NODE_ENV = process.env.NODE_ENV || 'development';

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(session({
            secret: ExpressService.SECRET,
            resave: false,
            saveUninitialized: true,
        }));
        this.app.use(express.static('public'));
        this.app.set('view engine', 'ejs');
        this.app.set('views', './views');
    }

    appLoggingMiddleware() {
        this.app.use((req, res, next) => {
            console.log(`${req.method} ${req.path}`, req.body);
            next();
        });

        this.app.use((req, res, next) => {
            console.log('Registered users: ', AuthService.USERS);
            next();
        });
    }

    addLoginRoutes() {
        // Root route
        this.app.get('/', (req, res) => {
            console.log('GET / - Redirecting to /login');
            return res.redirect('/login');
        });

        // Login route
        this.app.get('/login', (req, res) => {
            if (req.session.Username) {
                console.log('Already logged in, redirecting to /profile');
                return res.redirect('/profile');
            }
            console.log('Rendering login page');
            return res.render('login', { error: null });  // Pass error as null when no error
        });

        this.app.post('/login', (req, res) => {
            const { username, password } = req.body;
            console.log(`POST /login - Attempting login for ${username}`);
            if (AuthService.authenticate(username, password)) {
                req.session.Username = username;
                console.log('Login successful, redirecting to /profile');
                return res.redirect('/profile');
            }
            console.log('Login failed, rendering login page with error');
            return res.render('login', { error: 'Invalid credentials' });
        });

        this.app.get('/profile', (req, res) => {
            if (!req.session.Username) {
                console.log('Not logged in, redirecting to /login');
                return res.redirect('/login');
            }
            console.log('Rendering profile page');
            return res.render('profile', { user: req.session.Username });
        });
    }

    addLogoutRoute() {
        this.app.post('/logout', (req, res) => {
            if (req.session.Username) {
                console.log(`Logging out user: ${req.session.Username}`);
                req.session.destroy(err => {
                    if (err) {
                        console.error('Error destroying session:', err);
                        return res.status(500).send('Server error');
                    }
                    console.log('User logged out successfully');
                    return res.redirect('/login');
                });
            } else {
                console.log('No user logged in, redirecting to /login');
                return res.redirect('/login');
            }
        });
    }

    addSignUpRoutes() {
        this.app.get('/signup', (req, res) => {
            console.log('Rendering sign-up page');
            return res.render('signup', { error: null });
        });

        this.app.post('/signup', (req, res) => {
            const { username, password } = req.body;
            console.log(`POST /signup - Attempting to sign up user ${username}`);
            if (AuthService.register(username, password)) {
                req.session.Username = username;
                console.log('Sign-up successful, redirecting to /profile');
                return res.redirect('/profile');
            }
            console.log('Sign-up failed, rendering sign-up page with error');
            return res.render('signup', { error: 'Username already taken' });
        });
    }
}

export default ExpressService;
