const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const {
  readUsersFromFile,
  writeUsersToFile,
  verifyToken,
  delayMiddleware,
} = require("./utils");

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  console.error("Fatal Error: SECRET_KEY is not defined.");
  process.exit(1); // Exit the application if SECRET_KEY is not set
}

app.use(bodyParser.json());
app.use(cors());
app.use(delayMiddleware);

app.post("/login", (req, res) => {
  const { phone, password } = req.body;
  const users = readUsersFromFile();

  const user = users.find(
    (user) => user.phone === phone && user.password === password
  );

  if (user) {
    const token = jwt.sign(
      { id: user.id, name: user.name, phone: user.phone, role: user.role },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: "Geçersiz telefon numarası veya şifre" });
  }
});

app.get("/protected-data", verifyToken, (req, res) => {
  res.json({ data: "Bu korunan bir veridir!" });
});

app.get("/users", verifyToken, (req, res) => {
  const users = readUsersFromFile();
  res.json(users);
});

app.post("/users", verifyToken, (req, res) => {
  const users = readUsersFromFile();
  const newUser = req.body;
  newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(newUser);
  writeUsersToFile(users);
  res.status(201).json(newUser);
});

app.put("/users/:id", verifyToken, (req, res) => {
  const users = readUsersFromFile();
  const { id } = req.params;
  const updatedUser = req.body;

  const userIndex = users.findIndex((user) => user.id == id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    writeUsersToFile(users);
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }
});

app.delete("/users/:id", verifyToken, (req, res) => {
  const users = readUsersFromFile();
  const { id } = req.params;

  const userIndex = users.findIndex((user) => user.id == id);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    writeUsersToFile(users);
    res.json(deletedUser[0]);
  } else {
    res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }
});

app.get("/profile", verifyToken, (req, res) => {
  const users = readUsersFromFile();
  const user = users.find((user) => user.id === req.user.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
