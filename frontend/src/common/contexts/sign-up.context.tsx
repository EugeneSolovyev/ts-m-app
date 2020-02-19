import React, { createContext, useState } from 'react'

interface ISignUpProviderProps {
    children: React.ReactNode;
}

const INITIAL_VALUES = {
    phone: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: ''
}

type SignUpType = keyof typeof INITIAL_VALUES

export const SignUpContext = createContext<any>(INITIAL_VALUES)

export const SignUpProvider = ({ children }: ISignUpProviderProps) => {
    const [phone, setPhone] = useState<string>(INITIAL_VALUES.phone)
    const [username, setUsername] = useState<string>(INITIAL_VALUES.username)
    const [firstName, setFirstName] = useState<string>(INITIAL_VALUES.firstName)
    const [lastName, setLastName] = useState<string>(INITIAL_VALUES.lastName)
    const [email, setEmail] = useState<string>(INITIAL_VALUES.email)
    const [password, setPassword] = useState<string>(INITIAL_VALUES.password)
    const [repeatPassword, setRepeatPassword] = useState<string>(INITIAL_VALUES.repeatPassword)

    return (
        <SignUpContext.Provider
            value={{
                phone,
                setPhone,

                username,
                setUsername,

                firstName,
                setFirstName,

                lastName,
                setLastName,

                email,
                setEmail,

                password,
                setPassword,

                repeatPassword,
                setRepeatPassword,
            }}
        >
            {children}
        </SignUpContext.Provider>
    )
}