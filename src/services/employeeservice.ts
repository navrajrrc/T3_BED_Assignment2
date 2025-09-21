import { Employee } from "src/data/employees";
import { employee } from "src/data/employees";

const employees: Employee[] = [];

/**
 * Create a new employee and add them to the directory
 * 
 * Should include employee details such as name, position,
 * department, email, phone and branch ID.
 * 
 * Response: Should return the newly created employee object, including a unique ID.
 */
export const createEmployee = async (
    newEmployeeData: {
        name: string;
        position: string;
        department: string;
        email: string;
        phone: string;
        branchId: number;
    }
): Promise<Employee> => {
    const newEmployee: Employee = {
        id: Date.now(),
        name: newEmployeeData.name,
        position: newEmployeeData.position,
        department: newEmployeeData.department,
        email: newEmployeeData.email,
        phone: newEmployeeData.phone,
        branchId: newEmployeeData.branchId,
    };

    employees.push(newEmployee);

    return {...newEmployee};
}; 

/**
 * Gets all employees from the storage
 * @returns this will return a clone of all employees as an array
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return structuredClone(employees);
};

/**
 * Get a single employee by their ID
 * @param id this is the unique id of the employee we want to find
 * @returns this will return the employee object if found, otherwise undefined
 */
export const getEmployeeById = async (id: number): Promise<Employee | undefined> => {
    const employee = employees.find((emp) => emp.id === id);
    return employee ? structuredClone(employee) : undefined;
};

/**
 * Update an existing employee with the help of their id
 * @param id the unique employee id we want to update
 * @returns the updated employee object if found, otherwise undefined
 */
export const updateEmployee = async (
    id: number,
    updates: Pick<Employee, "name" | "position" | "department" | "email" | "phone" | "branchId" >
): Promise<Employee | undefined> => {
    const index = employees.findIndex((emp) => emp.id === id);

    if (index === -1) return undefined;

    employees[index] = { ...employees[index], ...updates, id};

    return structuredClone(employees[index]);
};

/**
 * Delete an employee by their id
 * @param id this is the id of the employee that we want to remove
 * @throws will throw an error if the employee with the given id does not exist
 */
export const deleteEmployee = async (id: number): Promise<void> => {
    const index = employees.findIndex((emp) => emp.id === id);

    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    employees.splice(index,1);
};