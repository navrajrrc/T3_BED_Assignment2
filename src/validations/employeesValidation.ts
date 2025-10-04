import Joi  from "joi"; 

/**
 * Employee schema oragnized by request type
 */
export const employeeSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/employees - Create new employee
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            position: Joi.string().required().messages({
                "any.required": "Position is required",
                "string.empty": "Position cannot be empty",
            }),
            email: Joi.string().email().required().messages({
                "any.required": "Email is required",
                "string.email": "Email must be valid",
            }),
            branchId: Joi.number().required().messages({
                "any.required": "Branch ID is required",
            }),
        }),
    },

    //PUT /api/v1/employees/:id - Update employee
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Employee ID is required",
                "string.empty":"Employee ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().optional(),
            position: Joi.string().optional(),
            email: Joi.string().email().optional(),
            branchId: Joi.number().optional(),
        }),
    },
};