// import { debounce } from 'lodash'
import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import {
    useTeachersFindMutation,
    useGroupsAddMutation,
} from '../../store/csais/csais.api'
import Button from '../Button'
import Input from '../Input'
import InputDelay from '../InputDelay'

import modal from './modal.module.css'

export default function GroupForm({ closeWindow, refetchGruops }) {
    const { user } = useAuth()
    const [teacherFullname, setTeacherFullname] = useState('')
    const [name, setName] = useState('')
    const [date_create, setDate_create] = useState('')
    const [date_end, setDate_end] = useState('')

    const [findTeacher, findTeacherRes] = useTeachersFindMutation()
    const [addGroup, addGroupRes] = useGroupsAddMutation()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addGroup({
            token: user.token,
            name: name,
            date_create: date_create,
            date_end: date_end,
            fullname: teacherFullname,
        })
        closeWindow()
        refetchGruops()
    }

    const findingTeachers = (fullname: string) => {
        findTeacher({
            token: user.token,
            fullname: fullname,
        })
    }

    return (
        <div className={modal.form}>
            <Input value={name} onChange={(e) => setName(e.target.value)} name="group" type="text" placeholder="Название группы" />
            <Input value={date_create} onChange={(e) => setDate_create(e.target.value)} name="date_create" type="date" placeholder="Дата создания" />
            <Input value={date_end} onChange={(e) => setDate_end(e.target.value)} name="date_end" type="date" placeholder="Дата выпуска" />
            <InputDelay
                callback={findingTeachers}
                inputing={setTeacherFullname}
                value={teacherFullname}
                list="teachers"
                type="text"
                name="teacherFullname"
                placeholder="Преподаватель"
            />
            <p>{teacherFullname}</p>
            <datalist id='teachers'>
                {findTeacherRes.data?.map((teacher) => (
                    <option key={teacher.fullname} value={teacher.fullname}>{teacher.fullname}</option>
                ))}
            </datalist>
            <Button onClick={handleSubmit}>Сохранить</Button>
        </div>
    )
}
