import React from 'react'
import st from '../style.module.css'
import stylejoin from '../../../lib/stylejoin'

export default function StudentsItem(data) {
    return (
        // <div className={st.item}>
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
