import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import {
    useTeachersFindMinMutation,
    useTeachersFindQuery,
    useTeachersUpdateMutation,
} from '../../../store/csais/csais.api'
import Input from '../../Input'

import st from './style.module.css'
import Button from '../../Button'

export default function FormTeacherUpdate({
    setIsOpenUpdate,
    query,
    teacherID,
}) {
    const { user } = useAuth()

    const [updateTeacher, updateTeacherRes] = useTeachersUpdateMutation()
    const queryFind = useTeachersFindQuery({ token: user.token, id: teacherID })

    const [fullname, setFullname] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    useEffect(() => {
        setFullname(queryFind.data?.[0].fullname)
        setPhone(queryFind.data?.[0].phone)
        setEmail(queryFind.data?.[0].email)
    }, [queryFind])

    const handleSubmitUpdate = () => {
        updateTeacher({
            token: user.token,
            fullname: fullname,
            phone: phone,
            email: email,
            id: teacherID,
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
        return <p style={{ color: 'gray', textAlign: 'center' }}>Загрузка</p>

    if (queryFind.isSuccess) {
        return (
            <div className={st.form}>
                <Input
                    type="text"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="ФИО преподавателя"
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
                <Button onClick={handleSubmitUpdate}>
                    <span>Изменить</span>
                </Button>
            </div>
        )
    }
}
