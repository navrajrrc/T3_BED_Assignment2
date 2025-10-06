import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/middleware/validate";
import { branchSchemas } from "../src/validations/branchValidation";
import { MiddlewareFunction } from "../src/types/express";
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("Branch Validation Middleware", () => {
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

    // Create branch
    it("should pass validation for valid branch creation", () => {
        mockReq.body = {
            name: "Main branch",
            address: "23 havelock ave",
            phone: "555-1234",
        };
        const middleware: MiddlewareFunction = validateRequest(
            branchSchemas.create
        );
    
        middleware(mockReq as Request, mockRes as Response, mockNext);
    
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });
    
    it("should fail validation when name is empty", () => {
        mockReq.body = {
            name: "",
            address: "23 havelock ave",
            phone: "555-1234",
        };
        const middleware: MiddlewareFunction = validateRequest(
            branchSchemas.create
        );
    
        middleware(mockReq as Request, mockRes as Response, mockNext);
    
        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: 'Validation error: Body: "name" is not allowed to be empty',
        });
    });
    
    // Update branch
    it("should pass validation for valid branch update data", () => {
        mockReq.params = { id: "1" };
        mockReq.body = { name: "Updated Branch" };
        const middleware: MiddlewareFunction = validateRequest(
            branchSchemas.update
        );

        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });

    it("should fail validation when id is missing for update", () => {
        mockReq.params = {};
        const middleware: MiddlewareFunction = validateRequest(
            branchSchemas.update
        );

        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    });

    //  Delete branch
    it("should fail validation when id is missing for delete", () => {
        mockReq.params = {};
        const middleware: MiddlewareFunction = validateRequest(
        branchSchemas.delete
        );

        middleware(mockReq as Request, mockRes as Response, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    });
});
