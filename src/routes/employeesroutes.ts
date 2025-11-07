import  express, { Router } from "express";
import * as employeecontroller from "../controllers/employeescontroller";
import { validateRequest } from "../middleware/validate";
import { employeeSchemas } from "../validations/employeesValidation";

const router: Router = express.Router();

// "api/v1/employeesroutes" prefixes all below routes


/**
 * @openapi
 * /api/v1/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Validation error
 */
router.post(
    "/",
    validateRequest(employeeSchemas.create),
    employeecontroller.CreateEmployee
);

/**
 * @openapi
 * /api/v1/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Employee"
 */
router.get("/", employeecontroller.getAllEmployees);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Employee"
 *       404:
 *         description: Employee not found
 */
router.get(
    "/:id",
    validateRequest(employeeSchemas.get),
    employeecontroller.getEmployeeById
);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Employee"
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Employee"
 *       400:
 *         description: Validation Error
 *       404:
 *         description: Employee not found
 */

router.put(
    "/:id", 
    validateRequest(employeeSchemas.update),
    employeecontroller.updateEmployee
);

/**
 * @openapi
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
router.delete(
    "/:id",
    validateRequest(employeeSchemas.delete),
    employeecontroller.deleteEmployee
);

export default router;
