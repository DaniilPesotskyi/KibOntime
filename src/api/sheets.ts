import {IUser} from "../types/userTypes.ts";

export const checkIfAlreadyCheckedIn = async (employeeId: IUser['id']) => {
    try {
        console.log('idUser: ', employeeId)

        const response = await fetch(`${import.meta.env.VITE_GOOGLESHEETS_URL}?employeeId=${employeeId}`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'
            },
            redirect: 'follow',
        });

        const responseJson = await response.json();
        console.log('responseJson: ', responseJson);

        return responseJson;

    } catch (error) {
        console.log('error: ', error);
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
