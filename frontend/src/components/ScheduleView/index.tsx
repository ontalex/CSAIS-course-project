import React, { FC, useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import {
    useScheduleAddMutation,
    useScheduleDeleteMutation,
    useScheduleGetQuery,
} from '../../store/csais/csais.api'
import { IScheduleItem } from '../../types/props.type'
import ScheduleItem from '../Items/ScheduleItem'
import useFormateLessons from '../../hooks/useFormateLessons'
import ScheduleItemNone from '../Items/ScheduleItemNone'

import st from './style.module.css'
import Modal from '../Modal'
import InputDelay from '../InputDelay'
import GroupSchedule from '../Forms/GroupSchedule'
import GroupScheduleUpdate from '../Forms/GroupScheduleUpdate'

interface IScheduleView {
    date: string
    group: string
}

export const ScheduleView: FC<IScheduleView> = (props) => {
    const { user } = useAuth()

    const [updateScheduleID, setUpdateScheduleID] = useState<
        string | number | undefined
    >()

    const query = useScheduleGetQuery({
        date_lesson: props.date,
        token: user.token,
        group_id: props.group,
    })

    const [openEdit, setOpenEdit] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)

    const [handLessonNumber, setHandLessonNumber] = useState<number>()
    const handleChoseUpdate = (id) => {
        setUpdateScheduleID(id)
        setOpenEdit(true)
    }

    const [deleteSchedule, deleteScheduleRes] = useScheduleDeleteMutation()

    return (
        <div className={st.list}>
            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                <h1>Изменить</h1>
                <GroupScheduleUpdate
                    closeWindow={() => setOpenEdit(false)}
                    refetch={() => query.refetch()}
                    scheduleID={updateScheduleID}
                />
            </Modal>

            <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
                <h1>Добавить</h1>
                <GroupSchedule
                    dateLesson={props.date}
                    closeWindow={() => setOpenAdd(false)}
                    refetch={query.refetch}
                    lessonNumber={handLessonNumber}
                />
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
                                    openEdit={() =>
                                        handleChoseUpdate(schedule.id)
                                    }
                                    delete={(id: number) => {
                                        deleteSchedule({
                                            token: user.token,
                                            id: id,
                                        })
                                        query.refetch()
                                    }}
                                />
                            )
                        } else {
                            return (
                                <ScheduleItemNone
                                    number_lesson={index + 1}
                                    onOpenWindow={(number_lesson: number) => {
                                        console.log('Lesson =', number_lesson)
                                        setHandLessonNumber(() => number_lesson)
                                        setOpenAdd(true)
                                    }}
                                />
                            )
                        }
                    }
                )}
        </div>
    )
}
