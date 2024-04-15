import React, { useEffect } from 'react'
import st from '../style.module.css'

export default function GroupsItem(data) {
    return (
        <div className={st.item}>
            <div className={st.info}>
                <p className={st.item_name}>{data.name}</p>
                <p className={st.item_subitem}>{data.fullname}</p>
            </div>
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
