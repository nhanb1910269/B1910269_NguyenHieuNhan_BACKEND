const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const app = express();
const config = {
    db: {
        uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/contactbook"
    }
}

app.use("/api/contacts", contactsRouter);
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

const contactsRouter = require("./app/routes/contact.route");

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

app.use("/api/contacts", contactsRouter);

module.exports = app;