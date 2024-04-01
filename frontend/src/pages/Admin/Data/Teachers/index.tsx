import React, { useState } from 'react'
import Input from '../../../../components/Input'
import Modal from '../../../../components/Modal'
import { useAuth } from '../../../../hooks/useAuth'
import {
    useTeachersAddMutation,
    useTeachersAllQuery,
} from '../../../../store/csais/csais.api'

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
            <button onClick={() => setIsOpen(true)}>+ добавить</button>

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

            <div>
                {query.data?.length === 0 && <p>Нету преподавателей</p>}
                {query.data?.map(
                    (student: {
                        id: React.Key | null | undefined
                        fullname: string
                    }) => <p key={student.id}>{student.fullname}</p>
                )}
            </div>
        </div>
    )
}
