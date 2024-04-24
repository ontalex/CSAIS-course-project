import React from 'react'
import Button from '../../Button'
import Input from '../../Input'

import st from './page.module.css'
import {
    useAccessesGroupsQuery,
    useRecoveryAccountMutation,
} from '../../../store/csais/csais.api'
import { Link } from 'react-router-dom'

export default function FormRecovery() {
    const [recover, recoverRes] = useRecoveryAccountMutation()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (event.target.elements.email.value.length > 0) {
            recover({
                email: event.target.elements.email.value,
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className={st.form}>
            {recoverRes.isSuccess && (
                <Link to={'/login'}>Перейти к авторизации</Link>
            )}

            {recoverRes.isLoading && (
                <p style={{ textAlign: 'center', color: "blue" }}>
                    ... Загрузка ...
                </p>
            )}

            {recoverRes.isError && (
                <p style={{ textAlign: 'center', color: 'red' }}>
                    {recoverRes.error.data.message}
                </p>
            )}

            <h2 className={st.form_span}>Восстановление</h2>
            <Input name="email" placeholder="Почта" />
            <button className={st.form_send}>
                <span>Восстановить</span>
            </button>
        </form>
    )
}
