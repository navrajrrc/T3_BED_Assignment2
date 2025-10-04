import  express, { Router } from "express";
import * as employeecontroller from "../controllers/employeescontroller";
import { validateRequest } from "../middleware/validate";
import { employeeSchemas } from "src/validations/employeesValidation";

const router: Router = express.Router();

// "api/v1/employeesroutes" prefixes all below routes
router.post(
    "/",
    validateRequest(employeeSchemas.create),
    employeecontroller.CreateEmployee
);

router.get("/", employeecontroller.getAllEmployees);

router.get(
    "/:id",
    validateRequest(employeeSchemas.get),
    employeecontroller.getEmployeeById
);

router.put(
    "/:id", 
    validateRequest(employeeSchemas.update),
    employeecontroller.updateEmployee
);

router.delete(
    "/:id",
    validateRequest(employeeSchemas.delete),
    employeecontroller.deleteEmployee
);

export default router;
