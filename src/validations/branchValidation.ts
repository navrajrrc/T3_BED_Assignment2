import Joi from "joi";
import { RequestSchema } from "src/middleware/validate";

export const branchSchemas: Record<string, RequestSchema> = {
    //POST /api/v1/branches -create branch
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Branch name is required",
                "String.empty": "Branch name cannot be empty",
            }),
            address: Joi.string().required().messages({
                "any.required": "Address is required",
                "string.empty": "Address cannot be empty",
            }),
            phone: Joi.string().required().messages({
                "any.required": "Phone number is required",
                "string.empty": "Phone number cannot be empty",
            }),
        }),
    },

    //PUT /api/v1/branches/:id - update branch
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Branch id is required",
                "string.empty": "Branch id cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().optional(),
            address: Joi.string().optional(),
            phone: Joi.string().optional(),
        }),
    },

    // Delete /api/v1/branches/:id
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Branch id is required",
                "string.empty": "Branch id cannot be empty",
            }),
        }),
    },
};