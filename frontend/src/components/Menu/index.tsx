import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import st from './menu.module.css'
import stylejoin from '../../lib/stylejoin'

import exit_icon from '../../assets/exit_icon.svg'
import home_icon from '../../assets/home_icon.svg'
import profile_icon from '../../assets/profile_icon.svg'
import schedule_icon from '../../assets/home_icon.svg'
import logbook_icon from '../../assets/home_icon.svg'
import data_icon from '../../assets/home_icon.svg'
import order_icon from '../../assets/home_icon.svg'
import { useAuth } from '../../hooks/useAuth'

export default function Menu() {
    const { signout } = useAuth()

    interface IMenuItem {
        name: string
        path: string
        icon: string
    }

    const menuItems: IMenuItem[] = [
        { name: 'Главная', path: '/admin/', icon: home_icon },
        { name: 'Журнал', path: '/admin/logbook', icon: logbook_icon },
        { name: 'Расписание', path: '/admin/schedule', icon: schedule_icon },
        { name: 'Данные', path: '/admin/data', icon: data_icon },
        { name: 'Отчёты', path: '/admin/order', icon: order_icon },
        { name: 'Профиль', path: '/admin/profile', icon: profile_icon },
    ]

    return (
        <menu className={st.menu}>
            <ul className={st.list}>
                {menuItems.map((item) => (
                    <NavLink className={st.item} to={item.path} key={item.name}>
                        <img src={item.icon} alt="" />
                        <p>{item.name}</p>
                    </NavLink>
                ))}
            </ul>
            <button
                className={stylejoin(st.item, st.item_exit)}
                onClick={signout}
            >
                <img src={exit_icon} alt="" />
                <p>Выйти</p>
            </button>
        </menu>
    )
}
