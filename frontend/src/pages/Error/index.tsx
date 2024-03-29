import React from 'react'
import st from './style.module.css'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <div className={st.error_page}>
            <h1>Ошибка 404</h1>
            <p>Вы перешли не туда.</p>
            <Link to={'/admin'}>На главную</Link>
        </div>
    )
}
