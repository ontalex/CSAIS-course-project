import React from 'react'
import st from '../style.module.css'
import { useAuth } from '../../../hooks/useAuth'

export default function GroupsItem(data) {
    let { user } = useAuth()
    return (
        <div className={st.item}>
            <div className={st.info}>
                <p className={st.item_name}>{data.name}</p>
                <p className={st.item_subitem}>{data.fullname}</p>
            </div>
            {user.role == 'staff' && (
                <div className={st.btns}>
                    <button
                        className={st.item_update}
                        onClick={() => data.update(data.group_id)}
                    >
                        <span>Изменить</span>
                    </button>
                    <button
                        className={st.item_delete}
                        onClick={() => data.delete(data.group_id)}
                    >
                        <span>Удалить</span>
                    </button>
                </div>
            )}
        </div>
    )
}
