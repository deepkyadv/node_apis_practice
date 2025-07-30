const express = require("express");
const user = require("./src/routes/user");
const cors = require("cors");

const { default: mongoose } = require("mongoose");
const app = express();

app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const mongoUrl = 
  "mongodb+srv://yadavdeepak13012001:z7EVXUVMkg1zW1sG@cluster0.y8edlx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  
app.get("/get-data", (req, res) => {
  res.status(200).json({ message: "this is test api" });
});

app.use(express.json());
app.use("/api", user);

mongoose
  .connect(mongoUrl)
  .then(() => console.log("DBConnection Successfull!!!"))
  .catch((err) => {
    console.log(err);
  });

app.listen(8000, () => {
  console.log("Server started on port 8000...");
});
