import * as employeeService from "../src/services/employeeservice";
import * as firestoreRepository from "../src/repositories/firestoreRepository";
import { Employee } from "../src/models/employee";

jest.mock("../src/repositories/firestoreRepository");

describe("Employee Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create an employee successfully", async () => {
        // Arrange
        const mockEmployeeData = {
            name: "Armaan",
            position: "Developer",
            department: "IT",
            email: "armaan@email.com",
            phone: "1234567890",
            branchId: 1,
        };
        const mockDocumentId = "employee-1";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockDocumentId);

        // Act
        const result: Employee = await employeeService.createEmployee(mockEmployeeData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "employees",
            expect.objectContaining(mockEmployeeData)
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockEmployeeData.name);
    });

    it("should get all employees successfully", async () => {
        // Arrange
        const mockDocs = [
            {
                id: "1",
                data: () => ({
                    name: "Armaan",
                    position: "Developer",
                    department: "IT",
                    email: "armaan@email.com",
                    phone: "1234567890",
                    branchId: 1,
                }),
            },
        ];
        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue({
            docs: mockDocs,
        });

        // Act
        const result = await employeeService.getAllEmployees();

        // Assert
        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("employees");
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("1");
        expect(result[0].name).toBe("Armaan");
    });

    it("should get employee by ID successfully", async () => {
        // Arrange
        const mockDoc = {
            id: "1",
            data: () => ({
                name: "Armaan",
                position: "Developer",
                department: "IT",
                email: "armaan@email.com",
                phone: "1234567890",
                branchId: 1,
            }),
        };
        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

        // Act
        const result = await employeeService.getEmployeeById("1");

        // Assert
        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("employees", "1");
        expect(result.id).toBe("1");
        expect(result.name).toBe("Armaan");
    });


    it("should update an employee successfully", async () => {
        // Arrange
        const mockEmployee = {
            id: "1",
            name: "Armaan",
            position: "Developer",
            department: "IT",
            email: "armaan@email.com",
            phone: "1234567890",
            branchId: 1,
        };
        jest.spyOn(employeeService, "getEmployeeById").mockResolvedValue(mockEmployee as Employee);
        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        const updates = { position: "Senior Developer" };

        // Act
        const result = await employeeService.updateEmployee("1", updates);

        // Assert
        expect(employeeService.getEmployeeById).toHaveBeenCalledWith("1");
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
            "employees",
            "1",
            expect.objectContaining({ ...mockEmployee, ...updates })
        );
        expect(result.position).toBe("Senior Developer");
    });


    it("should delete an employee successfully", async () => {
        // Arrange
        const mockEmployee = {
            id: "1",
            name: "Armaan",
            position: "Developer",
            department: "IT",
            email: "armaan@email.com",
            phone: "1234567890",
            branchId: 1,
        };
        jest.spyOn(employeeService, "getEmployeeById").mockResolvedValue(mockEmployee as Employee);
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        // Act
        await employeeService.deleteEmployee("1");

        // Assert
        expect(employeeService.getEmployeeById).toHaveBeenCalledWith("1");
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith("employees", "1");
    });
});