import React, { useState } from 'react'
import Input from '../../../../components/Input'
import Modal from '../../../../components/Modal'
import { useAuth } from '../../../../hooks/useAuth'
import {
    useTeachersAddMutation,
    useTeachersAllQuery,
} from '../../../../store/csais/csais.api'
import Button from '../../../../components/Button'
import TeachersItem from '../../../../components/Items/Teacher'

import list from "../list.module.css";

export default function Teachers() {
    const [isOpen, setIsOpen] = useState(false) // Modal window

    const { user } = useAuth()

    const query = useTeachersAllQuery({
        token: user.token,
    })
    const [addTeacher, addTeacherRes] = useTeachersAddMutation()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addTeacher({
            token: user.token,
            fullname: event.target.elements.fullname.value,
            phone: event.target.elements.phone.value,
            email: event.target.elements.email.value,
        })
        query.refetch()
        setIsOpen(false)
    }

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>+ добавить</Button>

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="fullname"
                        placeholder="ФИО преподавателя"
                    />
                    <Input
                        type="text"
                        name="phone"
                        placeholder="Номер телефона (9001112233)"
                    />
                    <Input
                        type="text"
                        name="email"
                        placeholder="Адрес электронной почты"
                    />
                    <button>Сохранить</button>
                </form>
            </Modal>

            <div className={list.list}>
                {query.data?.length === 0 && <p>Нету преподавателей</p>}
                {query.data?.map(
                    (teacher: {
                        id: React.Key | null | undefined
                        fullname: string
                    }) => (
                        <TeachersItem key={teacher.id} fullname={teacher.fullname} />
                    )
                )}
            </div>
        </div>
    )
}
