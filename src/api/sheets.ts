import {IUser} from "../types/userTypes.ts";

export const checkIfAlreadyCheckedIn = async (employeeId: IUser['id']) => {
    try {
        console.log('idUser: ', employeeId);

        const response = await fetch(`${import.meta.env.VITE_GOOGLESHEETS_URL}?employeeId=${employeeId}`, {
            method: 'GET',
        });
        
        if (!response.ok) {
            console.log(`Error: Server returned status ${response.status}`);
            return false;
        }

        const responseText = await response.text();
        console.log('Response Text:', responseText);

        if (responseText === "true") {
            return true;
        } else if (responseText === "false") {
            return false;
        } else {
            console.log('Unexpected response:', responseText);
            return false;
        }

    } catch (error) {
        console.log('Error: ', error);
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
