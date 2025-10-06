import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/middleware/validate";
import { employeeSchemas } from "../src/validations/employeesValidation";
import { MiddlewareFunction } from "../src/types/express";
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("Employee Validation Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {body: {}, params: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    // Create employee
    it("should pass validation for valid employee creation", () => {
        mockReq.body = {
            name: "Armaan",
            position: "Manager",
            department: "Management",
            email: "armaan@gmail.com",
            branchId: 1,
        };
        const middleware: MiddlewareFunction = validateRequest(
            employeeSchemas.create
        );

        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should fail validation when name is empty", () => {
        mockReq.body = {
            name: "",
            position: "Manager",
            department: "Management",
            email: "armaan@gmail.com",
            branchId: 1,
        };
        const middleware: MiddlewareFunction = validateRequest(
            employeeSchemas.create
        );

        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: "Validation error: Body: Name cannot be empty",
        });
    });

    // Update employee
    it("should pass validation for valid employee update", () => {
        mockReq.params = { id: "1"};
        mockReq.body = { name: "ansh" };
        const middleware: MiddlewareFunction = validateRequest(
            employeeSchemas.update
        );
        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    // Get employee by id
    it("should fail validation when id is missing", () => {
        mockReq.params = {};
        const middleware: MiddlewareFunction = validateRequest(
            employeeSchemas.get
        );

        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST)
    });

    // Delete employee
    it("should fail validation when id is empty for delete", () => {
        mockReq.params = { id: ""};
        const middleware: MiddlewareFunction = validateRequest(
            employeeSchemas.delete
        );
        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST)
    });
});