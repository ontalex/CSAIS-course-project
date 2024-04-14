import React from 'react'
import st from '../style.module.css'

export default function TeachersItem(data) {
    return (
        <div className={st.item}>
            <p className={st.item_name}>{data.fullname}</p>
            <div className={st.btns}>
                <button
                    className={st.item_update}
                    onClick={() => data.update(data.id)}
                >
                    <span>Изменить</span>
                </button>
                <button
                    className={st.item_delete}
                    onClick={() => data.delete(data.id)}
                >
                    <span>Удалить</span>
                </button>
            </div>
        </div>
    )
}
