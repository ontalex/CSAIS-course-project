import React, { useEffect, useState } from 'react'
import Input from '../../Input'
import InputDelay from '../../InputDelay'
import { store } from '../../../store'
import {
    useGroupsFindMutation,
    useStudentOneQuery,
    useStudentUpdateMutation,
} from '../../../store/csais/csais.api'
import { useAuth } from '../../../hooks/useAuth'
import Button from '../../Button'

import st from './style.module.css'

export default function StudentUpdateForm({
    setIsOpenUpdate,
    query,
    studentID,
}) {
    const { user } = useAuth()

    const [groupFind, groupFindRes] = useGroupsFindMutation()
    const [studentUpdate, studentUpdateRes] = useStudentUpdateMutation()
    const queryFind = useStudentOneQuery({ token: user.token, id: studentID })

    const [group, setGroup] = useState<string>('')
    const [fullname, setFullname] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    useEffect(() => {
        setGroup(queryFind.data?.[0].group_name)
        setFullname(queryFind.data?.[0].fullname)
        setPhone(queryFind.data?.[0].phone)
        setEmail(queryFind.data?.[0].email)
    }, [queryFind])

    const handleSubmitUpdate = () => {
        studentUpdate({
            token: user.token,
            fullname: fullname,
            phone: phone,
            email: email,
            group_name: group,
            id: studentID,
        })
        setIsOpenUpdate(false)
        setTimeout(() => query.refetch(), 3000)
    }

    const fetchingGroups = (name: string) => {
        if (name.trim().length > 0) {
            groupFind({
                token: user.token,
                name: name,
            })
        }
    }

    if (queryFind.isError)
        return (
            <p style={{ color: 'red', textAlign: 'center' }}>
                Ошибка получения данных о студенте
            </p>
        )

    if (queryFind.isLoading)
        return <p style={{ color: 'gray', textAlign: 'center' }}>Загрузка</p>

    if (queryFind.isSuccess) {
        return (
            <div className={st.form}>
                <Input
                    type="text"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="ФИО студента"
                />
                <Input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Номер телефона (9001112233)"
                />
                <Input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Адрес электронной почты"
                />
                <InputDelay
                    callback={fetchingGroups}
                    value={group}
                    inputing={(value) => setGroup(value)}
                    name="groupName"
                    list="groups"
                    placeholder="Группа"
                />

                <datalist id="groups">
                    {groupFindRes.data?.map((group) => (
                        <option key={group.name} value={group.name} />
                    ))}
                </datalist>

                <Button onClick={handleSubmitUpdate}>
                    <span>Изменить</span>
                </Button>
            </div>
        )
    }
}
