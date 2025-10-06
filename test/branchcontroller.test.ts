import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as branchController from "../src/controllers/branchController";
import * as branchServices from "../src/services/branchServices";
import { Branches } from "src/models/branchModel";
import { mock } from "node:test";

jest.mock("../src/services/branchServices");

describe("branch Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    //test to get all the branches
    describe("getAllBranches", () => {
        it("it should handle sucessful operation", async () => {
            const mockBranches: Branches[] = [
                { 
                id: "1", 
                name: "winnipeg",
                address: "111 abbotsford",
                phone: "123-456-7890",
                },
            ];
            (branchServices.getAllBranches as jest.Mock).mockReturnValue(mockBranches);

            await branchController.getAllBranches(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branches retrieved successfully",
                status: "success",
                data: mockBranches,
            });
        });
    });

    //this is test for create branch
    describe("createBranch", () => {
        it("should handle successful creation", async () => {
            const mockBody = { 
                name: "winnipeg",
                address: "111 abbotsford",
                phone: "123-456-7890",
            };

            const mockBranch: Branches = {
                id: "2",
                ...mockBody,
            };

            mockReq.body = mockBody;
            (branchServices.createBranch as jest.Mock).mockReturnValue(mockBranch);

            await branchController.createBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch created successfully",
                status: "success",
                data: mockBranch,
            });
        });

        it("should return 400 when name is missing", async () => {
            mockReq.body = {
                id: "1", 
                address: "111 abbotsford",
                phone: "123-456-7890",
            };
            await branchController.createBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "branch name is required",
            });
        });
    });

    //this is a test for update branch
    describe("updateBranch", () => {
        it("should handle successful updates", async () => {
            mockReq.params = { id: "111" };
            const Body = {
                name: "winnipeg",
                address: "111 abbotsford",
                phone: "123-456-7890",
            };

            const mockBranch: Branches = {
                id: "111",
                ...Body,
            };

            mockReq.body = Body;
            (branchServices.updateBranch as jest.Mock).mockReturnValue(mockBranch);

            await branchController.updateBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                status:"success",
                message: "Branch updated successfully",
                data: mockBranch,
            });
        });

        it("should return 400 when name is missing", async () => {
            mockReq.params = { id: "111" };
            mockReq.body = {
                address: "111 abbotsford",
                phone: "123-456-7890",
            };
            await branchController.updateBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch name is required",
            });
        });
            
    });

    //this is a test to delete branch
     describe("deleteBranch", () => {
                it("should handle successful deletion", async () => {
                mockReq.params = { id: "111" };
                (branchServices.deleteBranch as jest.Mock).mockResolvedValue(undefined);

            await branchController.deleteBranch(
            mockReq as Request,
            mockRes as Response,
            mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
            data: null,
            message: "Branch deleted successfully",
            status: "success",
        });
    });
});

});