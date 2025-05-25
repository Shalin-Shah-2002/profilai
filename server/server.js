const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
require("dotenv").config();
require("./config/passport");
require("./routes/pdf_handler");

const app = express()

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }))
app.use(passport.initialize())

mongoose.connect("mongodb+srv://2002shalin:NAspCYUNdSu7mEAa@resume-ai.wsurzji.mongodb.net/?retryWrites=true&w=majority&appName=Resume-Ai").then(() => { console.log("Connected to MongoDB") }).catch(err => console.error(err));


// for authentication
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/pdf", require("./routes/pdf_handler"));

app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR HANDLER CAUGHT:", err.stack);
    if (res.headersSent) {
        return next(err); // If headers already sent, let Express handle it.
    }
    res.status(err.status || 500).json({
        error: err.message || "An unexpected server error occurred.",
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined // Show stack in dev mode
    });
});

app.listen(5000, () => console.log("Server started on port 5000"));
