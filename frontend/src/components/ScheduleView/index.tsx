import React, { FC, useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useScheduleGetQuery } from '../../store/csais/csais.api'
import { IScheduleItem } from '../../types/props.type'
import ScheduleItem from '../Items/ScheduleItem'
import useFormateLessons from '../../hooks/useFormateLessons'
import ScheduleItemNone from '../Items/ScheduleItemNone'

import st from './style.module.css'
import Modal from '../Modal'

interface IScheduleView {
    date: string
    group: string
}

export const ScheduleView: FC<IScheduleView> = (props) => {
    const { user } = useAuth()
    const query = useScheduleGetQuery({
        date_lesson: props.date,
        token: user.token,
        group_id: props.group,
    })

    let [openEdit, setOpenEdit] = useState(false)
    let [openAdd, setOpenAdd] = useState(false)

    return (
        <div className={st.list}>
            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                <h1>Изменить</h1>
            </Modal>

            <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
                <h1>Добавить</h1>
            </Modal>

            {!query.isSuccess && <p>Загрузка...</p>}
            {query.isSuccess &&
                query.data &&
                useFormateLessons(query.data).map(
                    (schedule: IScheduleItem, index: number) => {
                        if (schedule.id) {
                            return (
                                <ScheduleItem
                                    {...schedule}
                                    key={schedule.id}
                                    openEdit={() => setOpenEdit(true)}
                                    delete={() => console.log('Delete')}
                                />
                            )
                        } else {
                            return (
                                <ScheduleItemNone
                                    number_lesson={index + 1}
                                    onOpenWindow={() => setOpenAdd(true)}
                                />
                            )
                        }
                    }
                )}
        </div>
    )
}
