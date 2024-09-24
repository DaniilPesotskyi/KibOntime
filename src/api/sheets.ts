import {IUser} from "../types/userTypes.ts";

export const checkIfAlreadyCheckedIn = async (employeeId: IUser['id']) => {
    try {
        console.log('idUser: ', employeeId);

        const response = await fetch(`${import.meta.env.VITE_GOOGLESHEETS_URL}?employeeId=${employeeId}`, {
            method: 'GET',
        });

        // Проверка, что ответ успешен
        if (!response.ok) {
            console.log(`Error: Server returned status ${response.status}`);
            return false;
        }

        // Захватим текст ответа для анализа
        const responseText = await response.text();
        console.log('Response Text:', responseText);

        // Попробуем распарсить как JSON
        try {
            const responseJson = JSON.parse(responseText);
            console.log('Parsed JSON:', responseJson);
            return responseJson;
        } catch (jsonError) {
            console.log('Error parsing JSON: ', jsonError);
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
