import React from 'react'
import Header from '../../../components/Header'
import MainWrapper from '../../../components/MainWrapper'
import st from './style.module.css'
import { Link, Outlet } from 'react-router-dom'

export default function Data() {
    return (
        <>
            <Header>Данные</Header>
            <MainWrapper>
                <div className={st.menu_tables}>
                    <Link className={st.menu_link} to={'./groups'}>
                        Группы
                    </Link>
                    <Link className={st.menu_link} to={'./teachers'}>
                        Преподаватели
                    </Link>
                    <Link className={st.menu_link} to={'./students'}>
                        Студенты
                    </Link>
                    <Link className={st.menu_link} to={'./lessons'}>
                        Дисциплины
                    </Link>
                </div>
                <Outlet />
            </MainWrapper>
        </>
    )
}
