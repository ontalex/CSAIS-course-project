import React, { useEffect, useLayoutEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { T_Props } from '../types/props.type'

const RequireAuth = ({ children }: T_Props) => {
    const location = useLocation()
    const navigate = useNavigate()

    const { user, check, isAuth } = useAuth()

    const fromPage = location.state?.from?.pathname || '/admin'

    useEffect(() => {
        check(
            () => {
                console.log('Проверка успешна - перенаправление на страницу')
                console.log('Require Auth: ', user)
            },
            () => {
                console.log('Проверка не успешна - перенаправление на страницу')
                navigate('/login', { replace: true, state: { from: location } })
                // return <Navigate to={`../login`} state={{ from: location }} />
            }
        )
    }, [])

    if (!user) {
        console.log('Данные отсутствуют - перенаправление на автризацию', user)
        console.log('>> NAV to LOGIN')
        navigate('/login', { replace: true, state: { from: location } })
    }
    console.log('Данные есть - перенаправление на страницу', user)

    if (!isAuth) return <p>Загрузка</p>
    return children
}

export { RequireAuth }
