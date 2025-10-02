import request from "supertest";
import app from "../src/app";
import * as branchController from "../src/controllers/branchController";
import { HTTP_STATUS } from "../src/constants/httpConstants";


jest.mock("../src/controllers/branchController", () => ({
    getAllBranches:jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createBranch:jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateBranch:jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteBranch:jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Employee routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    //this is a test for get all branches
     describe("GET /api/v1/branch/", () => {
        it("should call getAallEmployees controller", async () => {
            await request(app).get("/api/v1/branches/");
            expect(branchController.getAllBranches).toHaveBeenCalled();
        });
    });
    
    //this is a test for create branch
     describe("POST api/v1/branch/", () => {
        it("should call createbranch controller", async () => {
            const body = {
                name: "armaan",
                address: "23 havelock ave",
                phone: "123-456-7890",

            };
            await request(app).post("/api/v1/branches/").send(body);
            expect(branchController.createBranch).toHaveBeenCalled();
        });
    });

    //this test is for update branches
    describe("POST api/v1/branch/:id", () => {
        it("should call update controller", async () => {
            const mockbody = {
                name: "armaan",
                address: "23 havelock ave",
                phone: "123-456-7890",

            };
            await request(app).put("/api/v1/branches/111").send(mockbody);
            expect(branchController.updateBranch).toHaveBeenCalled();
        });
    });

    //this is for delete branch
    describe("DELETE api/v1/branch/:id", () => {
        it("should call deleteEmployee controller", async () => {
            await request(app).delete("/api/v1/branches/111");
            expect(branchController.deleteBranch).toHaveBeenCalled();
        });
    });

});

