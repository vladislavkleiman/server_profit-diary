import verify from "jsonwebtoken";
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

export { authenticateToken };
