import React, { useCallback, useState } from 'react'
import list from '../list.module.css'
import modal from '../modal.module.css'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import Modal from '../../../../components/Modal'
import { useAuth } from '../../../../hooks/useAuth'
import {
    useGroupsAllQuery,
    useGroupsAddMutation,
    useTeachersFindQuery,
    useTeachersFindMutation,
} from '../../../../store/csais/csais.api'
import GroupsItem from '../../../../components/Items/Group'
import { T_group_card, T_teacher_option } from '../../../../types/csais.types'
import { debounce } from 'lodash'
import InputDelay from '../../../../components/InputDelay'

export default function Groups() {
    const [isOpen, setIsOpen] = useState(false) // Modal window

    const [teacherFullname, setTeacherFullname] = useState('')
    const [name, setName] = useState('')
    const [date_create, setDate_create] = useState('')
    const [date_end, setDate_end] = useState('')
    const [tutor_id, setTutor_id] = useState('')

    const { user } = useAuth()

    const query = useGroupsAllQuery({
        token: user.token,
    })

    const [findTeacher, findTeacherRes] = useTeachersFindMutation()
    const [addGroup, addGroupRes] = useGroupsAddMutation()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addGroup({
            token: user.token,
            name: name,
            date_create: date_create,
            date_end: date_end,
            tutor_id: tutor_id,
        })
        setIsOpen(false)
        query.refetch()
    }

    const handleOpenModal = () => {
        setIsOpen(true)
    }

    const handleChangeInputTutor = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTeacherFullname(event.target.value)
        if (teacherFullname.length > 1) {
            findTeacher({
                token: user.token,
                fullname: teacherFullname,
            })
        }
    }

    return (
        <div>
            <Button onClick={handleOpenModal}>+ добавить</Button>

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <form onSubmit={} className={modal.form}>
                    <Input
                        type="text"
                        placeholder="Название группы"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Input
                        type="date"
                        placeholder="Дата создания"
                        value={date_create}
                        onChange={(event) => setDate_create(event.target.value)}
                    />
                    <Input
                        type="date"
                        placeholder="Дата выпуска"
                        value={date_end}
                        onChange={(event) => setDate_end(event.target.value)}
                    />
                    <InputDelay
                        type="text"
                        name="tutor_id"
                        list="tutors"
                        placeholder="Куратор"
                        value={teacherFullname}
                        onChange={handleChangeInputTutor}
                    />
                    <datalist id="tutors">
                        {findTeacherRes.data?.map(
                            (teacher: T_teacher_option) => (
                                <option
                                    value={teacher.id}
                                    label={teacher.fullname}
                                />
                            )
                        )}
                    </datalist>
                    <Button>Сохранить</Button>
                </form>
            </Modal>

            <div className={list.list}>
                {query.data?.length === 0 && <p>Нету групп</p>}
                {query.data?.map((group: T_group_card) => (
                    <GroupsItem key={group.id} name={group.name} />
                ))}
            </div>
        </div>
    )
}
