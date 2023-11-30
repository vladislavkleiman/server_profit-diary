import verify from "jsonwebtoken";
import jwt from "jsonwebtoken";
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];

  if (!token) {
    return res.redirect("/profitdiary/auth/login");
  }

  try {
    const decoded = verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/profitdiary/auth/login");
  }
};

export { authenticateToken };
