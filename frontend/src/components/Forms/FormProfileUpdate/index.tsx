import React, { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import {
    useProfileGetSelfQuery,
    useProfileUpdateSelfMutation,
} from '../../../store/csais/csais.api'
import Button from '../../Button'

import st from './style.module.css'
import Input from '../../Input'

export default function FormProfileUpdate() {
    let { user } = useAuth()
    let query = useProfileGetSelfQuery({
        token: user.token,
    })

    let [userData, setUserData] = useState({
        login: '',
        password: '',
    })

    let [profile, profileRes] = useProfileUpdateSelfMutation()

    let handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('TEST USER UPDATE:', {
            token: user.token,
            login: userData.login,
            password: userData.password,
        })
        profile({
            token: user.token,
            login: userData.login,
            password: userData.password,
        })
    }

    useEffect(
        () =>
            setUserData({
                ...userData,
                login: query.data?.[0].login,
            }),
        [query]
    )

    return (
        <div>
            {query.isLoading && <p>Загрузка ...</p>}
            {Boolean(query.data) && (
                <form onSubmit={handleSubmit} className={st.form}>
                    {profileRes.isError && (
                        <p style={{ color: 'red', textAlign: 'center' }}>
                            (Код: {profileRes.error.status}){' '}
                            {profileRes.error.data.message}
                        </p>
                    )}
                    <Input
                        type="text"
                        name="login"
                        id=""
                        placeholder="Логин"
                        value={userData.login}
                        onChange={(event) =>
                            setUserData({
                                ...userData,
                                login: event.target.value,
                            })
                        }
                    />
                    <Input
                        type="password"
                        name="password"
                        id=""
                        placeholder="Пароль"
                        value={userData.password}
                        onChange={(event) =>
                            setUserData({
                                ...userData,
                                password: event.target.value,
                            })
                        }
                    />
                    <Button disabled={userData.password.trim() == ''}>
                        <span>Изменить</span>
                    </Button>
                </form>
            )}
        </div>
    )
}
