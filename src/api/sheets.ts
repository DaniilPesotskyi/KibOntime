import {IUser} from "../types/userTypes.ts";

export const checkIfAlreadyCheckedIn = async (employeeId: IUser['id']) => {
    try {

        const response = await fetch(`${import.meta.env.VITE_GOOGLESHEETS_URL}?employeeId=${employeeId}`, {
            method: 'GET',
            mode: 'no-cors',
        });

        return await response.json();

    } catch {
        return false;
    }
};

export const recordAttendance = async (employeeId: IUser['id'], employeeName: IUser['first_name']) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_GOOGLESHEETS_URL}?employeeId=${employeeId}&employeeName=${employeeName}`, {
            method: 'POST',
        });

        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error("Ошибка при отправке отметки:", error);
    }
};
