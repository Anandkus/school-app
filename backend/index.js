const exp = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config({ path: './config/.env' });
const app = exp();
const PORT = process.env.PORT;

//middleware
app.use(morgan("dev"));
app.use(cors());
app.use(exp.json());

//import routes
const contactRoutes = require("./routes/contact");
const eventRoutes = require("./routes/event");
const gallerRoutes = require("./routes/gallery");
const noticeRoutes = require("./routes/notice");
const teacherRoutes = require("./routes/teacher");
const authRoutes = require("./routes/auth");

//using routes
app.use("/api/contact", contactRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/gallery", gallerRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
  console.log(`server is runing on PORT ${PORT}`);
  connectDb();

})
