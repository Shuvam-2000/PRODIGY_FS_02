import express from 'express';
import { adminSignUp, employeeLogin } from '../controllers/admin.controller.js';

const router = express.Router();

// admin SignUp
router.post('/signup', adminSignUp);

// login for both admin and login
router.post('/login', employeeLogin);

export default router;