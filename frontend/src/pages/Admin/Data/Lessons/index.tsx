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

export default function Lessons() {
    const [isOpen, setIsOpen] = useState(false) // Modal window

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
        setIsOpen(false)
    }

    const handleDelete = (id) => {
        deleteLessons({
            token: user.token,
            id: id,
        })
        query.refetch()
    }

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>+ добавить</Button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <form onSubmit={handleSubmit} className={modal.form}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Название предмета"
                    />
                    <Button>Сохранить</Button>
                </form>
            </Modal>
            <div className={list.list}>
                {query.data?.length === 0 && <p>Нету дисциплин</p>}
                {query.data?.map(
                    (lessons: {
                        id: React.Key | null | undefined
                        name: string
                    }) => (
                        <LessonsItem
                            key={lessons.id}
                            id={lessons.id}
                            delete={handleDelete}
                            name={lessons.name}
                        />
                    )
                )}
            </div>
        </div>
    )
}
