import type { Branches } from "../../src/models/branchModel";
import { branches } from "../../src/data/branches";

/**
 * This will get all the branches
 * @returns A list of all the branches
 */
export const getAllBranches = async(): Promise<Branches[]> => {
    return structuredClone(branches);
};

/**
 * This will create a new branch
 * @param newBranchData It includes the info about the new branch
 * @returns it will return a new branch
 */
export const createBranch = async (newBranchData: {
    name: string;
    address: string;
    phone: string;
    }
): Promise<Branches> => {
    const newBranch: Branches = {
        id: Date.now(),
        name: newBranchData.name,
        address: newBranchData.address,
        phone: newBranchData.phone,
    };
    
    branches.push(newBranch)

    return structuredClone(newBranch)
};

/**
 * This will update a branch
 * @param id the id needed to update the particular branch
 * @param branchData this is the info in the branch that will be updated
 * @returns the update data of the branch
 */
export const updateBranch = async (
    id: number,
    branchData: Pick<Branches, "name" | "address"| "phone"> 
): Promise<Branches> => {
    const index: number = branches.findIndex((b: Branches) => b.id === id);

    if (index === -1) {
        throw new Error(`Branch with ID ${id} is not found`)
    }

    branches[index] = {
        ...branches[index],
        ...branchData
    };

    return structuredClone(branches[index]);
};

/**
 * This will get the branch by id
 * @param id The id of the branch
 */
export const getBranchesById =  async (id:number): Promise<void> => {
    const index: number = branches.findIndex((emp: Branches) => emp.id === id);
    
    if (index === -1) {
        throw new Error(`Branch with this ID ${id} is not found`)
    }
};

/**
 * This will delete the branch by id 
 * @param id this is the id of the branch
 * @param remove the branch by their id
 */
export const deleteBranch = async (id:number): Promise<void> => {
    const index: number = branches.findIndex((b: Branches) => b.id === id);

    if (index === -1) {
        throw new Error(`Branch with ID ${id} is not found`)
    }

    branches.splice(index,1);
};


