import React from 'react'
import Button from '../../Button'
import Input from '../../Input'

import st from './page.module.css'
import { useRecoveryAccountMutation } from '../../../store/csais/csais.api'

export default function FormRecovery({
    switchForm,
}: {
    switchForm: () => void
}) {
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
            {recoverRes.isLoading && (
                <p style={{ textAlign: 'center', color: 'blue' }}>
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
            {recoverRes.isSuccess && (
                <Button onClick={switchForm}>
                    <span>К авторизации &gt;</span>
                </Button>
            )}
        </form>
    )
}
