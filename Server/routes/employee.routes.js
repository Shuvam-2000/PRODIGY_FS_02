import express from "express";
import {
  createNewEmployee,
  deleteEmployeeInfo,
  getAllEmployees,
  getEmployeeById,
  getOwnProfile,
  updateEmployeeInfo,
  updateSelfInfo,
} from "../controllers/employee.controller.js";
import { userAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// create new employee
router.post("/createemployee", userAuthenticated, createNewEmployee);

// get employee by Id
router.get("/getemployee", userAuthenticated, getAllEmployees);

// get employee by Id
router.get("/getemployee/:id", userAuthenticated, getEmployeeById);

// update employee by Id
router.put("/updateemployee/:id", userAuthenticated, updateEmployeeInfo);

// delete employee by Id
router.delete("/deleteemployee/:id", userAuthenticated, deleteEmployeeInfo);

// get own info for employee
router.get("/selfInfo", userAuthenticated, getOwnProfile);

// update employee info by self employee
router.put("/selfupdate", userAuthenticated, updateSelfInfo);

export default router;
