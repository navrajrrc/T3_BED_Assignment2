import { Request, Response, NextFunction }  from "express";
import { HTTP_STATUS} from "../../src/constants/httpConstants";
import * as employeeService from "../../src/services/employeeservice";
import { Employee } from "../../src/models/employee";
import { successResponse } from "src/models/responseModels";

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
        const { name, position, department, email, phone, branchId} = req.body;

        const newEmployee: Employee = await employeeService.createEmployee({
            name,
            position,
            department,
            email,
            phone,
            branchId,
        });

        res
            .status(HTTP_STATUS.CREATED)
            .json(successResponse(newEmployee, "Employee created successfully"));
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
        res
            .status(HTTP_STATUS.OK)
            .json(successResponse(employees, "Employees retrieved successfully"))
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
        const employee = await employeeService.getEmployeeById(id);

        if (!employee) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: `Employee with ID ${id} not found`
            });
            return;
        }
        res
            .status(HTTP_STATUS.OK)
            .json(successResponse(employee, "Employee retrieved successfully"));
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
        const{ name, position, department, email, phone, branchId} = req.body;

        const updateEmployee = await employeeService.updateEmployee(id, {
            name,
            position,
            department,
            email,
            phone,
            branchId,
        });

        if (!updateEmployee) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                message: `Employee with ID ${id} not found`
            });
            return;
        }

        res
            .status(HTTP_STATUS.OK)
            .json(successResponse(updateEmployee, "Employee updated successfully"));
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

        res
            .status(HTTP_STATUS.OK)
            .json(successResponse(null, "Employee deleted successfully"));
    } catch (error: unknown) {
        next(error);
    }
};