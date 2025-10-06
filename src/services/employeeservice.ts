import { QuerySnapshot , DocumentData, DocumentSnapshot } from "node_modules/firebase-admin/lib/firestore";
import { Employee } from "../data/employees";
import { employee } from "../data/employees";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
} from "../repositories/firestoreRepository";

const COLLECTION: string = "employees";

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
    const dateNow = new Date();
    const newEmployee: Partial<Employee> = {
        ...newEmployeeData,
    };

    const emplyeeId: string = await createDocument<Employee>(COLLECTION, newEmployee);

    return {id: emplyeeId, ...newEmployee} as Employee;
}; 

/**
 * Gets all employees from the storage
 * @returns Array of all employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const employees: Employee[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Employee;
        });

        return employees;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Get a single employee by their ID
 * @param id this is the unique id of the employee we want to find
 * @returns this will return the employee object if found, otherwise undefined
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    const data: DocumentData |undefined = doc.data();
    const employee: Employee = {
        id:doc.id,
        ...data,
    } as Employee;

    return employee;
};

/**
 * Update an existing employee with the help of their id
 * @param id the unique employee id we want to update
 * @returns the updated employee object if found, otherwise undefined
 */
export const updateEmployee = async (
    id: string,
    updates: Partial<Pick<Employee, "name" | "position" | "department" | "email" | "phone" | "branchId" >>
): Promise<Employee> => {
    const employee: Employee = await getEmployeeById(id);

    const updateEmployee: Employee = {
        ...employee,
    };

    if (updates.name !== undefined) updateEmployee.name = updates.name;
    if (updates.position !== undefined) updateEmployee.position = updates.position;
    if (updates.department !== undefined) updateEmployee.department = updates.department;
    if (updates.email !== undefined) updateEmployee.email = updates.email;
    if (updates.phone !== undefined) updateEmployee.phone = updates.phone;
    if (updates.branchId !== undefined) updateEmployee.branchId = updates.branchId;

    await updateDocument<Employee>(COLLECTION, id, updateEmployee);

    return updateEmployee;
};

/**
 * Delete an employee by their id
 * @param id this is the id of the employee that we want to remove
 * @throws will throw an error if the employee with the given id does not exist
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    const employee: Employee = await getEmployeeById(id);

    if (!employee) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    await deleteDocument(COLLECTION, id);
};