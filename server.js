const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./backend/config/db");
const cors = require("cors");
const path = require("path");

const subjectRoutes = require("./backend/routes/subject.routes");

dotenv.config();
connectDB();

const app = express();

/* MIDDLEWARE */
app.use(express.json());
app.use(cors());

/* API ROUTES */
app.use("/api/auth", require("./backend/routes/authRoutes"));
app.use("/api/students", require("./backend/routes/student.routes"));
app.use("/api/courses", require("./backend/routes/course.route"));
app.use("/api/departments", require("./backend/routes/departmentRoutes"));
app.use("/api/subjects", subjectRoutes); 
app.use("/api/master", require("./backend/routes/master.routes"));

/* DASHBOARD ROUTE (ROOT) */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dashboard.html"));
});

/* STUDENT CRUD ROUTE */
app.get("/students", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "login.html"));
});

/* STATIC FILES (MUST BE LAST) */
app.use(express.static(path.join(__dirname, "frontend")));
app.use("/api", require("./backend/routes/master"));
/* SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
