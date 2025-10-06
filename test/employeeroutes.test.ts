import request from "supertest";
import app from "../src/app";
import * as employeeController from "../src/controllers/employeescontroller";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { employee } from "src/data/employees";

jest.mock("../src/controllers/employeescontroller", () => ({
    CreateEmployee: jest.fn((req,res) => 
    res.status(HTTP_STATUS.CREATED).send()),

    getAllEmployees: jest.fn((req, res) =>
    res.status(HTTP_STATUS.OK).send()),

    getEmployeeById: jest.fn((req, res) => 
    res.status(HTTP_STATUS.OK).send()),

    updateEmployee: jest.fn((req, res) => 
    res.status(HTTP_STATUS.OK).send()),

    deleteEmployee: jest.fn((req,res) => 
    res.status(HTTP_STATUS.OK).send()),

}));

afterEach(() => {
    jest.clearAllMocks();
});

describe("Employee Routes",() => {
    describe("GET /api/v1/employees", () => {
        it("should call getAllEmployees controller", async () => {
            await request(app).get("/api/v1/employees");

            expect(employeeController.getAllEmployees).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/employees", () => {
        it("should call CreateEmployee controller", async () => {
            await request(app).post("/api/v1/employees").send({
                name: "Armaan singh",
                position: "Developer",
                department: "IT",
                email: "armaan@email.com",
                phone: "1234567890",
                branchId: 1
            });

            expect(employeeController.CreateEmployee).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1employees/:id", () => {
        it("should call getEmployeeId controller", async () => {
            await request(app).get("/api/v1/employees/1");

            expect(employeeController.getEmployeeById).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/employees/:id", () => {
        it("should call updateEmployee controller", async () => {
            await request(app).put("/api/v1/employees/1").send({
                position: "Senior Developer"
            });

            expect(employeeController.updateEmployee).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/employees/:id", () => {
        it("should call deleteEmployee controller", async () => {
            await request(app).delete("/api/v1/employees/1");

            expect(employeeController.deleteEmployee).toHaveBeenCalled();
        });
    });
});