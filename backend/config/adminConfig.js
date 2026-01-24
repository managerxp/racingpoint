import dotenv from 'dotenv';
dotenv.config();

export const adminConfig = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  isAdmin: true
};

export default adminConfig;