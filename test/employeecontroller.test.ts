import { Request, Response , NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as employeeController from "../src/services/controllers/employeescontroller";
import * as employeeService from "../src/services/employeeservice";

jest.mock("../src/services/employeeservice");

describe("Employee Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn();
        jest.clearAllMocks();
    });

    // Test for create employee
    describe("CreateEmployee", () => {
        it("should create an employee successfully", async () => {
            mockReq.body = {
                name: "Armaan",
                position: "Developer",
                department: "IT",
                email: "armaan@email.com",
                phone: "1234567890",
                branchId: 1
            };
            (employeeService.createEmployee as jest.Mock).mockResolvedValue({
                id: 1,
                ...mockReq.body
            });

            await employeeController.CreateEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(employeeService.createEmployee).toHaveBeenCalledWith(mockReq.body);
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee created",
                data: {id:1, ...mockReq.body}
            });
        });

        it("should call next with erroe when it fails", async () => {
            const error = new Error("Failed");
            (employeeService.createEmployee as jest.Mock).mockRejectedValue(error);

            await employeeController.CreateEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    //get all employee tests
    describe("getAllEmployees", () => {
        it("should retrieve all employees successfully", async () => {
            (employeeService.getAllEmployees as jest.Mock).mockResolvedValue([
                { id: 1, name: "armaan"}
            ]);

            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(employeeService.getAllEmployees).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees retrieved successfully",
                data: [{ id: 1, name: "armaan"}]
            });
        });

        it("should call next with error when service fails", async () => {
            const error = new Error("Failed");
            (employeeService.getAllEmployees as jest.Mock).mockRejectedValue(error);

            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    //get employee by id tests
    
});