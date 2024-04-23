import React from 'react'
import { Outlet } from 'react-router-dom'
import st from './admin.module.css'

import Menu from '../../components/Menu'

export default function Admin() {
    return (
        <div className={st.page}>
            <div className={st.view}>
                <Outlet />
            </div>
            <Menu />
        </div>
    )
}
