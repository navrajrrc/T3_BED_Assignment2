import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../src/constants/httpConstants";
import * as branchServices from "../../src/services/branchServices";
import { Branches } from "../../src/models/branchModel";
import { successResponse } from "src/models/responseModels";

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
        res.status(HTTP_STATUS.OK).json(
            successResponse(branch, "Branches retrieved successfully")
        );
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
        if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "branch name is required"
            });
        } else if (!req.body.address) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "branch address is required "
            });
        } else if (!req.body.phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "branch phone is required"
            });
        } else{
            const {name, address, phone} = req.body;
            
            const newBranch: Branches = await branchServices.createBranch({name, address, phone});
            res.status(HTTP_STATUS.CREATED).json(
                successResponse(newBranch, "Branch created successfully")
            );
        }
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
        if (Number.isNaN(Number(req.params.id))) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"ID is not valid"
            });
        } else if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Branch name is required"
            });
        } else if (!req.body.address) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"branch address is required"
            });
        } else if (!req.body.phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message:"Branch phone is required"
            });
        } else {
            const id: number = Number(req.params.id)
            const {name, address, phone} = req.body;

            const updatedBranch: Branches = await branchServices.updateBranch(id,{name, address, phone});
            res.status(HTTP_STATUS.OK).json(
                successResponse(updateBranch, "Branch updated successfully")
            );
        }
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

        await branchServices.deleteBranch(Number(id));
        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Branch deleted successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};