import React, { useEffect } from 'react'
import st from '../style.module.css'
import stylejoin from '../../../lib/stylejoin'
import { useAuth } from '../../../hooks/useAuth'
import {
    useOlderActiveMutation,
    useOlderCreateMutation,
    useOlderOffMutation,
} from '../../../store/csais/csais.api'

export default function StudentsItem(data) {
    const { user } = useAuth()

    useEffect(() => console.log(user), [])
    useEffect(() => console.log(data), [])

    const [offOlder, offOlderRes] = useOlderOffMutation()
    const [activeOlder, activeOlderRes] = useOlderActiveMutation()
    const [createOlder, createOlderRes] = useOlderCreateMutation()

    const handlerCreateOlder = () => {
        createOlder({
            token: user.token,
            id: data.id,
        })
        data.refetch()
    }

    const handlerActiveOlder = () => {
        activeOlder({
            token: user.token,
            id: data.id,
        })
        data.refetch()
    }

    const handlerOffOlder = () => {
        offOlder({
            token: user.token,
            id: data.id,
        })
        data.refetch()
    }

    return (
        <div
            className={
                data.isActive == 1 ? stylejoin(st.item, st.item_older) : st.item
            }
        >
            <div className={st.info}>
                <p className={st.item_name}>{data.fullname}</p>
                <div className={st.links}>
                    <a
                        href={`mailto:${data.email}`}
                        className={st.item_data_link}
                    >
                        {data.email}
                    </a>
                    <a
                        href={`tel:8${data.phone}`}
                        className={st.item_data_link}
                    >
                        8{data.phone}
                    </a>
                </div>
            </div>
            <div className={st.btns}>
                {user.role == 'tutor' && !data.user_id && (
                    <button
                        onClick={handlerCreateOlder}
                        className={st.item_create}
                        disabled={createOlderRes.isLoading}
                    >
                        <span>Назначить старостой</span>
                    </button>
                )}
                {user.role == 'tutor' && data.isActive == 1 && (
                    <button
                        onClick={handlerOffOlder}
                        className={st.item_off}
                        disabled={offOlderRes.isLoading}
                    >
                        <span>Отключить</span>
                    </button>
                )}
                {user.role == 'tutor' && data.isActive == 0 && (
                    <button
                        onClick={handlerActiveOlder}
                        className={st.item_on}
                        disabled={activeOlderRes.isLoading}
                    >
                        <span>Активировать</span>
                    </button>
                )}
                {user.role == 'staff' && (
                    <button
                        className={st.item_update}
                        onClick={() => data.update(data.id)}
                    >
                        <span>Изменить</span>
                    </button>
                )}
                {user.role == 'staff' && (
                    <button
                        className={st.item_delete}
                        onClick={() => data.delete(data.id)}
                    >
                        <span>Удалить</span>
                    </button>
                )}
            </div>
        </div>
    )
}
