import React, { useState } from 'react'
import Input from '../../../../components/Input'
import Modal from '../../../../components/Modal'
import { useAuth } from '../../../../hooks/useAuth'
import {
    useTeachersAllQuery,
    useTeachersAddMutation,
    useLessonsAllQuery,
    useLessonsAddMutation,
    useLessonsDeleteMutation,
} from '../../../../store/csais/csais.api'
import Button from '../../../../components/Button'
import LessonsItem from '../../../../components/Items/Lesson'

import st from './style.module.css'
import list from '../list.module.css'
import modal from '../modal.module.css'
import FormUpdateLesson from '../../../../components/Forms/FormUpdateLesson'

export default function Lessons() {
    const [isOpenAdd, setIsOpenAdd] = useState(false) // Modal window
    const [isOpenUpdate, setIsOpenUpdate] = useState(false) // Modal window

    const [updateLesson, setUpdateLesson] = useState()

    const { user } = useAuth()

    const query = useLessonsAllQuery({
        token: user.token,
    })
    const [addLessons, addLessonsRes] = useLessonsAddMutation()
    const [deleteLessons, deleteLessonsRes] = useLessonsDeleteMutation()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addLessons({
            token: user.token,
            name: event.target.elements.name.value,
        })
        query.refetch()
        setIsOpenAdd(false)
    }

    const handleDelete = (id) => {
        deleteLessons({
            token: user.token,
            id: id,
        })
        query.refetch()
    }

    const handleUpdate = (id) => {
        console.log('To update Open window')
        setUpdateLesson(id)
        setIsOpenUpdate(true)
    }

    return (
        <div>
            {user.role == 'staff' && (
                <Button onClick={() => setIsOpenAdd(true)}>+ добавить</Button>
            )}
            <Modal open={isOpenAdd} onClose={() => setIsOpenAdd(false)}>
                <h1>Добавить дисциплину</h1>
                <form onSubmit={handleSubmit} className={modal.form}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Название предмета"
                    />
                    <Button>Сохранить</Button>
                </form>
            </Modal>
            <Modal open={isOpenUpdate} onClose={() => setIsOpenUpdate(false)}>
                <h1>Изменить дисциплину</h1>
                <FormUpdateLesson
                    setIsOpenUpdate={setIsOpenUpdate}
                    query={query}
                    lessonID={updateLesson}
                />
            </Modal>
            <div className={list.list}>
                {query.data?.length === 0 && <p>Нету дисциплин</p>}
                {query.isFetching && <p>Загрузка...</p>}
                {query.data?.map(
                    (lessons: {
                        id: React.Key | null | undefined
                        name: string
                    }) => (
                        <LessonsItem
                            key={lessons.id}
                            id={lessons.id}
                            delete={handleDelete}
                            update={handleUpdate}
                            name={lessons.name}
                        />
                    )
                )}
            </div>
        </div>
    )
}
