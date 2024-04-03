import React from 'react'
import st from '../style.module.css'

export default function TeachersItem(data) {
    return (
        <div className={st.item}>
            <p className={st.item_name}>{data.fullname}</p>
            <button
                className={st.item_delete}
                onClick={() => data.delete(data.id)}
            >
                <span>Удалить</span>
            </button>
        </div>
    )
}
