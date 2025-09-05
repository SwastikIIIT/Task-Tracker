import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Cookies from "js-cookie";

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 12);
};

export const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};


export const storeAuthData = (token, user) => {
  Cookies.set("token", token, { secure: true, sameSite: "Strict" });
  Cookies.set("user", JSON.stringify(user), { secure: true, sameSite: "Strict" });
};


export const getStoredToken = () => {
  return Cookies.get("token") || null;
};


export const getStoredUser = () => {
  const userData = Cookies.get("user");
  return userData ? JSON.parse(userData) : null;
};

export const clearAuthData = () => {
  Cookies.remove("token");
  Cookies.remove("user");
};