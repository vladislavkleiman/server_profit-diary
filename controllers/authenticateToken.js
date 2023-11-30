import verify from "jsonwebtoken";
import jwt from "jsonwebtoken";
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.redirect("/login");
  }
};

export { authenticateToken };
