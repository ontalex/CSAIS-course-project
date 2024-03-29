import React, { createContext, useState } from 'react'
import { useAuthMutation, useAuthTokenMutation } from '../store/csais/csais.api'
import { T_Props } from '../types/props.type'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }: { children: T_Props }) => {
    const [user, setUser] = useState(undefined)
    const [signinFetch] = useAuthMutation()
    const [checkFetch] = useAuthTokenMutation()

    const check = (cb, errorCb) => {
        console.log('First Check: ', {
            local: localStorage.getItem('token'),
            context: user,
        })

        if (!localStorage.getItem('token') && !user) {
            console.log('Redirect to Login page')
            return errorCb()
        }

        if (localStorage.getItem('token')) {
            console.log('Rewrite context')
            setUser({
                token: localStorage.getItem('token'),
            })
        }

        checkFetch({ token: localStorage.getItem('token') })
            .then(({ data }) => {
                console.log('Check data: ', data)
                setUser({ token: data.token, role: data.role })
                localStorage.setItem('token', data.token)
                cb()
                console.log('Запрос выполнен. Обработка', data)
            })
            .catch((error) => {
                console.log('Запрос не выполнен. Ошибка', error)
                errorCb()
            })
    }
    const signin = (user, cb: () => void, errorCb: (arg: string) => void) => {
        signinFetch(user)
            .then(({ data }) => {
                console.log('SignIn data: ', data)
                setUser(data)
                localStorage.setItem('token', data.token)
                cb()
            })
            .catch((error) => {
                console.log('SignIn - Error', error)
                errorCb(error.message)
            })
    }

    const signout = (cb: () => void) => {
        console.log('SignOut')
        setUser(null)
        localStorage.removeItem('token')
        cb()
    }
    const value = { user, signin, signout, check }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
