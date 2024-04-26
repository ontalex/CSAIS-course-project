/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from 'react'
import { useAuthMutation, useAuthTokenMutation } from '../store/csais/csais.api'
import { T_Props } from '../types/props.type'
import { TRQ_answer_auth, TRQ_login } from '../types/csais.types'
import { store } from '../store'
import { groupSlice } from '../store/csais/groupData.slice'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit/react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }: { children: T_Props }) => {
    const [user, setUser] = useState<TRQ_answer_auth | undefined>(undefined)
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [signinFetch, { error, isError }] = useAuthMutation()
    const [checkFetch] = useAuthTokenMutation()

    const check = (cb: () => void, errorCb: () => void) => {
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
                ...user,
                token: localStorage.getItem('token'),
            })
        }

        checkFetch({ token: localStorage.getItem('token') })
            .then(({ data }) => {
                console.log('Check data: ', data)

                setUser({ token: data.token, role: data.role })

                if (data.group.length > 0) {
                    store.dispatch(
                        groupSlice.actions.setGroup({
                            groupID: data.group[0]?.id,
                        })
                    )
                    console.log(
                        'GROUP from redux:',
                        store.getState().group.groupID
                    )
                    console.log('GROUP from reqest:', data.group[0].id)
                }

                localStorage.setItem('token', data.token)
                console.log('Запрос выполнен. Обработка', data)

                cb()
                setIsAuth(true)
            })
            .catch((error) => {
                console.log('Запрос не выполнен. Ошибка', error)
                errorCb()
                setIsAuth(false)
            })
    }
    const signin = (
        user: TRQ_login,
        cb: () => void,
        errorCb: (arg0: { error: any; isError: boolean }) => void
    ) => {
        signinFetch(user)
            .unwrap()
            .then((data) => {
                console.log('SignIn data: ', data)
                setUser(data)
                localStorage.setItem('token', data.token)

                cb()
                setIsAuth(true)
            })
            .catch((error) => {
                console.log('SignIn - Error', error)
                console.log('SignIn - Error REQ', error)
                errorCb({ error: error, isError: isError })
            })
    }

    const signout = (cb: () => void) => {
        console.log('SignOut')
        setUser(undefined)
        localStorage.removeItem('token')
        cb()
        setIsAuth(false)
    }
    const value = { user, signin, signout, check, isAuth, setIsAuth }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
