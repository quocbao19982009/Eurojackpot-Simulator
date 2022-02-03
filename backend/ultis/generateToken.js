import jwt from "jsonwebtoken";

// This take an ID because it will encypt the ID into the token
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

  return token;
};

export default generateToken;
