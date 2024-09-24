import {useEffect, useRef, useState} from "react";

import {IUser} from "./types/userTypes.ts";
import {IButtonStatus} from "./types/statusType.ts";

import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import LoginButton from "./components/LoginButton/LoginButton.tsx";
import UserInfo from "./components/UserInfo/UserInfo.tsx";
import CheckButton from "./components/CheckinButton/CheckButton.tsx";

import {checkIfAlreadyCheckedIn, recordAttendance} from "./api/sheets.ts";
import {toast, Toaster} from "react-hot-toast";
import RealtimeClock from "./components/RealtimeClock/RealtimeClock.tsx";

function App() {
    const [isAccessed, setIsAccessed] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [status, setStatus] = useState<IButtonStatus>('load')

    const isAccessedRef = useRef(isAccessed);

    const isAuthenticated = user !== null

    const getIPFromAmazon = () => {
        return fetch('https://checkip.amazonaws.com/')
            .then((res) => res.text())
            .then((data) => data.trim());
    }

    useEffect(() => {
        const getAndSetAccess = async () => {
            try {
                const ip = await getIPFromAmazon();
                if (ip.includes('178.151.158.226')) {
                    setIsAccessed(true)
                } else {
                    setIsAccessed(false);
                }
            } catch {
                toast.error('Error getting IP');
                setIsAccessed(false);
            }
        }
        getAndSetAccess()
    }, [])

    useEffect(() => {
        isAccessedRef.current = isAccessed;
    }, [isAccessed]);

    const onLogin = (user: IUser) => {
        setUser(user)

        console.log('isAccessed:', isAccessed);

        if (!isAccessedRef.current) {
            setStatus("unavailable")
            return
        }

        const getAndSetStatus = async () => {
            try {
                const alreadyCheckedIn = await checkIfAlreadyCheckedIn(user.id);
                console.log('alreadyCheckedIn', alreadyCheckedIn);

                if (alreadyCheckedIn) {
                    setStatus('checkedIn')
                } else {
                    setStatus('noCheckedIn')
                }
            } catch {
                toast.error('Помилка перевірки. Спробуйте ще раз')
                setStatus("unavailable")
            }
        }

        getAndSetStatus()
    }

    const checkInUser = async () => {
        if (user === null) {
            return
        }

        if (status === 'checkedIn') {
            toast('Так, це потужно!')
            return
        } else if (status === 'unavailable') {
            toast.error('Можливо тільки в мережі офісу')
            return;
        } else if (status === 'load') {
            toast('Завантажую!')
            return
        }

        try {
            setStatus('load')
            await recordAttendance(user.id, user.first_name)
            setStatus('checkedIn')
            toast.success("Відзначення збережено!")
        } catch {
            console.log('Помилка запису')
            setStatus("noCheckedIn")
        }
    }

    return (
        <>
            <Header isAccessed={isAccessed}/>
            <RealtimeClock isAccessed={isAccessed} user={user} status={status}/>
            <main>
                {isAuthenticated ? (
                    <div>
                        <UserInfo user={user}/>
                        <CheckButton status={status} onClick={checkInUser}/>
                    </div>
                ) : (
                    <div>
                        <LoginButton onLogin={onLogin}/>
                    </div>
                )}
            </main>
            <Footer/>
            <Toaster
                position="bottom-center"
            />
        </>
    )
}

export default App
