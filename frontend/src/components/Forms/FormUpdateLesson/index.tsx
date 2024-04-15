import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import {
    useLessonUpdateMutation,
    useLessonsFindIdQuery,
} from '../../../store/csais/csais.api'
import Input from '../../Input'
import Button from '../../Button'

import st from './style.module.css'

export default function FormUpdateLesson({ setIsOpenUpdate, query, lessonID }) {
    const { user } = useAuth()

    const [updateLesson, updateLessonRes] = useLessonUpdateMutation()
    const queryFind = useLessonsFindIdQuery({ token: user.token, id: lessonID })

    const [name, setName] = useState<string>('')

    useEffect(() => {
        setName(queryFind.data?.[0].name)
    }, [queryFind])

    const handleSubmitUpdate = () => {
        updateLesson({
            token: user.token,
            id: lessonID,
            name: name,
        })
        setIsOpenUpdate(false)
        query.refetch()
    }

    if (queryFind.isError)
        return (
            <p style={{ color: 'red', textAlign: 'center' }}>
                Ошибка получения данных о преподавателе
            </p>
        )

    if (queryFind.isLoading)
        return (
            <p style={{ color: 'gray', textAlign: 'center' }}>
                Загрузка данных
            </p>
        )

    if (queryFind.isSuccess) {
        return (
            <div className={st.form}>
                <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название дисциплины"
                />
                <Button onClick={handleSubmitUpdate}>
                    <span>Изменить</span>
                </Button>
            </div>
        )
    }
}
