const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const usersFilePath = path.join(__dirname, "users.json");
const SECRET_KEY = process.env.SECRET_KEY;

const readUsersFromFile = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token bulunamadı" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token geçersiz" });
  }
};

module.exports = {
  readUsersFromFile,
  writeUsersToFile,
  verifyToken,
};
