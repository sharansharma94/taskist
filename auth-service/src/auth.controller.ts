import User from "./auth.model.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import config from "./config/jwt.ts";

// Define the expected shape of the request body
interface AuthRequestBody {
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.send({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as AuthRequestBody; // Cast req.body to AuthRequestBody
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: "Invalid Credentials" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
  console.log('Login password:', password);
  console.log('Stored hashed password:', user.password);
  console.log('Comparison result:', isPasswordCorrect);
  
  if (!isPasswordCorrect) {
    return res.status(401).send({ message: "Invalid Credentials" });
  }
  

  const token = jwt.sign({ email: user.email }, config.secret, {
    expiresIn: config.expiresIn,
  });

  res.send({ token });
};
