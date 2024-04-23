import React from 'react'
import Header from '../../../components/Header'
import MainWrapper from '../../../components/MainWrapper'
import st from './style.module.css'
import { Link, NavLink, Outlet } from 'react-router-dom'
import stylejoin from '../../../lib/stylejoin'

export default function Data() {
    const links = [
        {
            path: './groups',
            name: 'Группы',
        },
        {
            path: './teachers',
            name: 'Преподаватели',
        },
        {
            path: './students',
            name: 'Студенты',
        },
        {
            path: './lessons',
            name: 'Дисциплины',
        },
    ]

    return (
        <>
            <Header>Данные</Header>
            <MainWrapper>
                <div className={st.menu_tables}>
                    {links.map((link) => (
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? stylejoin(
                                          st.menu_link,
                                          st.menu_link_active
                                      )
                                    : st.menu_link
                            }
                            to={link.path}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
                <Outlet />
            </MainWrapper>
        </>
    )
}
