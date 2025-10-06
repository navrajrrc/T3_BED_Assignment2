import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../src/constants/httpConstants";
import * as branchServices from "../../src/services/branchServices";
import { Branches } from "../../src/models/branchModel";
import { successResponse } from "../models/responseModels";

/**
 * This will get all the branches
 */
export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branch: Branches[] = await branchServices.getAllBranches();
        res
            .status(HTTP_STATUS.OK)
            .json(successResponse(branch, "Branches retrieved successfully"));
    } catch (error: unknown) {
        next(error)
    }
};

/**
 * This will create a branch
 */
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const {name, address, phone} = req.body;
            
        const newBranch: Branches = await branchServices.createBranch({
            name, 
            address, 
            phone});

        if (!createBranch) {
            res
                .status(HTTP_STATUS.BAD_REQUEST)
                .json({message: `branch name is required`});
            return;
        }

        res
            .status(HTTP_STATUS.CREATED)
            .json(successResponse(newBranch, "Branch created successfully"));
    } catch (error: unknown) {
        next(error)
    }
};

/**
 * This will update the branch
 */
export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try{
        const {id} = req.params;
        const {name, address, phone} = req.body;

        const updatedBranch: Branches = await branchServices.updateBranch(id,{
            name, 
            address, 
            phone});

        if (!updateBranch) {
            res
                .status(HTTP_STATUS.NOT_FOUND)
                .json({message: `Branch with ID ${id} not found`});
            return;
        }
        res
            .status(HTTP_STATUS.OK)
            .json(successResponse(updateBranch, "Branch updated successfully") );
    } catch (error: unknown) {
        next(error)
    }
};

/**
 * This will delete a branch
 */
export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await branchServices.deleteBranch(id);
        res
            .status(HTTP_STATUS.OK)
            .json(successResponse(null, "Branch deleted successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};