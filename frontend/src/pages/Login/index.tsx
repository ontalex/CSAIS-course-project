import st from './page.module.css'
import logo from '../../assets/logo.svg'
import { useState } from 'react'
import Input from '../../components/Input'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import FormRecovery from '../../components/Forms/FormRecovery'
// import { useAuthMutation } from '../../store/csais/csais.api'
// import { TRQ_answer_auth } from '../../types/csais.types'

export function Login() {
    const navigate = useNavigate()
    const location = useLocation()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const [errorData, setErrorData] = useState()

    const { signin } = useAuth()

    const [isRecover, setIsRecover] = useState(false)

    function submitForm(e: React.FormEvent<HTMLFormElement>) {
        // прервать поведение
        e.preventDefault()

        // валидация формы
        if (!login.trim() || !password.trim()) {
            return console.log('INVALID')
        }

        signin(
            {
                login,
                password,
            },
            () => {
                navigate(location.state?.from?.pathname || '/admin')
            },
            (err) => {
                console.log(err)
                setErrorData(err)
            }
        )
    }

    return (
        <div className={st.page}>
            <div className={st.form_box}>
                <div className={st.logo_box}>
                    <img src={logo} alt="" className={st.logo_img} />
                    <div className={st.login_box_text}>
                        <h1 className={st.logo_name}>испук</h1>
                        <p className={st.logo_description}>
                            Информационная система посещаемости учащихся
                            колледжа
                        </p>
                    </div>
                </div>
                {isRecover ? (
                    <FormRecovery />
                ) : (
                    <form onSubmit={submitForm} className={st.form}>
                        <h2 className={st.form_span}>Вход в систему</h2>
                        {errorData?.isError && (
                            <p
                                style={{
                                    color: 'red',
                                    textAlign: 'center',
                                }}
                            >
                                (Ошибка {errorData.error.status}){' '}
                                {errorData.error.data?.message}
                            </p>
                        )}
                        <Input
                            type="text"
                            name="login"
                            id="login_auth"
                            onChange={(e) => setLogin(e.target.value)}
                            value={login}
                            placeholder="Логин"
                        />
                        <Input
                            type="password"
                            name="password"
                            id="password_auth"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Пароль"
                        />
                        <button onClick={(event) => {
                            event.preventDefault();
                            setIsRecover(true);
                        }} className={st.form_send}>
                            <span>Не помню пароль или логин</span>
                        </button>
                        <button className={st.form_send}>
                            <span>Войти</span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
