import React, { useState } from 'react'
import Input from '../../../../components/Input'
import Modal from '../../../../components/Modal'
import { useAuth } from '../../../../hooks/useAuth'
import {
    useTeachersAddMutation,
    useTeachersAllQuery,
    useTeachersDeleteMutation,
} from '../../../../store/csais/csais.api'
import Button from '../../../../components/Button'
import TeachersItem from '../../../../components/Items/Teacher'

import list from '../list.module.css'
import modal from '../modal.module.css'
import FormTeacherUpdate from '../../../../components/Forms/FormTeacherUpdate'

export default function Teachers() {
    const [isOpenAdd, setIsOpenAdd] = useState(false) // Modal window
    const [isOpenUpdate, setIsOpenUpdate] = useState(false) // Modal window
    const [updateTeacherID, setUpdateTeacherID] = useState<number | undefined>()

    const { user } = useAuth()

    const query = useTeachersAllQuery({
        token: user.token,
    })
    const [addTeacher, addTeacherRes] = useTeachersAddMutation()

    const [deleteTeacher, deleteTeacherRes] = useTeachersDeleteMutation()

    const handleDelete = (id) => {
        deleteTeacher({
            token: user.token,
            id: id,
        })
        query.refetch()
    }

    const handleUpdate = (id) => {
        setUpdateTeacherID(id)
        setIsOpenUpdate(true)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addTeacher({
            token: user.token,
            fullname: event.target.elements.fullname.value,
            phone: event.target.elements.phone.value,
            email: event.target.elements.email.value,
        })
        query.refetch()
        setIsOpenAdd(false)
    }

    return (
        <div>
            <Button onClick={() => setIsOpenAdd(true)}>+ добавить</Button>

            <Modal open={isOpenAdd} onClose={() => setIsOpenAdd(false)}>
                <h1>Добавить преподавателя</h1>
                <form onSubmit={handleSubmit} className={modal.form}>
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
                    <Button>Сохранить</Button>
                </form>
            </Modal>

            <Modal open={isOpenUpdate} onClose={() => setIsOpenUpdate(false)}>
                <h1>Изменить преподавателя</h1>
                <FormTeacherUpdate
                    setIsOpenUpdate={setIsOpenUpdate}
                    query={query}
                    teacherID={updateTeacherID}
                />
            </Modal>

            <div className={list.list}>
                {query.data?.length === 0 && <p>Нету преподавателей</p>}
                {query.data?.map(
                    (teacher: {
                        id: React.Key | null | undefined
                        fullname: string
                    }) => (
                        <TeachersItem
                            key={teacher.id}
                            id={teacher.id}
                            fullname={teacher.fullname}
                            delete={handleDelete}
                            update={handleUpdate}
                        />
                    )
                )}
            </div>
        </div>
    )
}
