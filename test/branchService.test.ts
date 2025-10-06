import * as branchService from "../src/services/branchServices";
import * as firestoreRepository from "../src/repositories/firestoreRepository";
import { Branches } from "../src/models/branchModel";

jest.mock("../src/repositories/firestoreRepository");

describe("Branch Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a branch successfully", async () => {
        const mockBranchData = {
            name: "Winnipeg",
            address: "123 Main St",
            phone: "123-456-7890",
        };
        const mockDocumentId = "branch-1";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockDocumentId);

        const result: Branches = await branchService.createBranch(mockBranchData);

        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "branches",
            expect.objectContaining(mockBranchData)
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockBranchData.name);
    });


    it("should get a branch by ID successfully", async () => {
        const mockBranch: Branches = {
            id: "branch-1",
            name: "Winnipeg",
            address: "123 Main St",
            phone: "123-456-7890",
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue({
            id: mockBranch.id,
            data: () => ({
                name: mockBranch.name,
                address: mockBranch.address,
                phone: mockBranch.phone,
            }),
        });

        const result = await branchService.getBranchesById("branch-1");

        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("branches", "branch-1");
        expect(result).toEqual(mockBranch);
    });

});