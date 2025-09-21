import { Request, Response, NextFunction }  from "express";
import { HTTP_STATUS} from "../../constants/httpConstants";
import * as employeeService from "../../services/employeeservice";
import { Employee } from "../../models/employee";

/**
 * Controller to create a new employee
 * @param req Request object that contains employee details
 * @param res Response object used to send back the created employee
 * @param next NextFunction for error handling
 */
export const CreateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employeeData = req.body;
        const newEmployee: Employee = await employeeService.createEmployee(employeeData);
        res.status(HTTP_STATUS.CREATED).json({
            message: "Employee created",
            data: newEmployee
        });
    } catch (error: unknown) {
        next(error);
    }
};


/**
 * Controller to get all employees from the storage
 * @param req Request object
 * @param res Response object used to send back all employees
 * @param next Next function for error handling
 */
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getAllEmployees();
        res.status(HTTP_STATUS.OK).json({
            message: "Employees retrieved successfully",
            data: employees
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Controller to get a single employee by their id.
 * @param req Request object that contains the employee ID
 * @param res Repsonse object used to send back the employee
 * @param next NextFunction for error handling
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const employee: Employee | undefined = await employeeService.getEmployeeById(id);

        if (!employee) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: `Employee with ID ${id} not found`
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Employee retrieved",
            data: employee
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Controller to update an existing employee by their id
 * @param req Request object that contains employee id
 * @param res Response object used to send back the updated employee
 * @param next NextFunction for error handling
 */
export const updateEmployee = async (
    req: Request,
    res:Response,
    next: NextFunction,
): Promise<void> => {
    try{
        const id = Number(req.params.id);
        const updates = req.body;

        const updateEmployee: Employee | undefined = await employeeService.updateEmployee(id, updates);

        if (!updateEmployee) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: `Employee with ID ${id} not found`
            });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Employee updated",
            data:updateEmployee
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Controller to delete an employee by their id
 * @param req Request object containing employee ID
 * @param res Response object used to send back the delete message
 * @param next NextFucntion for error handling
 */
export const deleteEmployee = async (
    req: Request,
    res:Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const id = Number(req.params.id);
        await employeeService.deleteEmployee(id);

        res.status(HTTP_STATUS.OK).json({
            message: "Employee deleted"
        });
    } catch (error: unknown) {
        next(error);
    }
};