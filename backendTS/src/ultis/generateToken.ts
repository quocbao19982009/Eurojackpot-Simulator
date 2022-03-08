import jwt from "jsonwebtoken";

// This take an ID because it will encypt the ID into the token

export interface DataStoreInToken {
  id: string;
}

const generateToken = (id: string) => {
  const DataStoreInToken: DataStoreInToken = {
    id: id,
  };

  const token = jwt.sign(DataStoreInToken, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  return token;
};

export default generateToken;
