const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/ConnectDB");
const utilisateur = require("./model/utilisateur");

const app = express();
app.use(express.json());

connectDB();

// post
app.post("/user/post", async (req, res) => {
  const { name, email, age, password } = req.body;
  try {
    const newUser = new utilisateur({ name, email, age, password });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.error(error.message);
  }
});

// get
app.get("/user/get", async (req, res) => {
  try {
    const users = await utilisateur.find();
    res.send(users);
  } catch (error) {
    console.error(error.message);
  }
});

// update
app.put("/user/update/:id", async (req, res) => {
  try {
    const editedUser = await utilisateur.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.send(editedUser);
  } catch (error) {
    console.error(error.message);
  }
});

// delete
app.delete("/user/delete/:id", async (req, res) => {
  try {
    await utilisateur.findByIdAndDelete(req.params.id);
    res.send("User Deleted !...");
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`Server running on port ${PORT}...`)
);
