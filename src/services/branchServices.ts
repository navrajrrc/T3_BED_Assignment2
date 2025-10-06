import type { Branches } from "../../src/models/branchModel";
import { branches } from "../../src/data/branches";
import { 
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "node_modules/firebase-admin/lib/firestore"

import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository"

const COLLECTION: string = "branches";
/**
 * This will get all the branches
 * @returns A list of all the branches
 */
export const getAllBranches = async(): Promise<Branches[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const branches: Branches[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Branches;
        });
        return branches;
    } catch (error: unknown) {
        throw error;
    }

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
    try {
        const newBranch: Partial<Branches> = {...newBranchData};
        const branchId: string = await createDocument<Branches>(COLLECTION, newBranch);
        return {id: branchId, ...newBranch} as Branches;
    } catch (error: unknown) {
        throw error;
    }
    
};

/**
 * This will update a branch
 * @param id the id needed to update the particular branch
 * @param branchData this is the info in the branch that will be updated
 * @returns the update data of the branch
 */
export const updateBranch = async (
    id: string,
    branchData: Pick<Branches, "name" | "address"| "phone"> 
): Promise<Branches> => {
    try {
        const branch: Branches = await getBranchesById(id);

        const updateBranch: Branches = {...branch};
        if (branchData.name !== undefined) updateBranch.name = branchData.name;
        if(branchData.address !== undefined) updateBranch.address = branchData.address;
        if (branchData.phone !== undefined) updateBranch.phone = branchData.phone;

        await updateDocument<Branches>(COLLECTION, id, updateBranch);
        return updateBranch;
    } catch (error: unknown) {
        throw error;
    }
    
};
/**
 * This will get the branch by id
 * @param id The id of the branch
 */
export const getBranchesById =  async (id:string): Promise<Branches> => {
    try {
        const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION,id);

        if (!doc) throw new Error(`Branch with ID ${id} not found`);

        const data: DocumentData | undefined = doc.data();
        return structuredClone({
            id: doc.id,
            ...data,
        } as Branches);
    } catch (error: unknown) {
        throw error;
    }
}; 
    
/**
 * This will delete the branch by id 
 * @param id this is the id of the branch
 * @param remove the branch by their id
 */
export const deleteBranch = async (id: string): Promise<void> => {
    try {
        const branch: Branches = await getBranchesById(id);
        if (!branch) throw new Error(`Branch with id ${id} not found`);

        await deleteDocument(COLLECTION, id);
    } catch (error: unknown) {
        throw error;
    }
};


