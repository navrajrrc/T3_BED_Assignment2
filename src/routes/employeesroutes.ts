import  express, { Router } from "express";
import * as employeecontroller from "../controllers/employeescontroller";

const router: Router = express.Router();


router.post("/", employeecontroller.CreateEmployee);
router.get("/", employeecontroller.getAllEmployees);
router.get("/:id", employeecontroller.getEmployeeById);
router.put("/:id", employeecontroller.updateEmployee);
router.delete("/:id", employeecontroller.deleteEmployee);

export default router;
