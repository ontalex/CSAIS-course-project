import React, { useEffect, useState } from 'react'
import st from './style.module.css'
import Button from '../../Button'
import Input from '../../Input'
import {
    useGroupFindIdQuery,
    useGroupsUpdateMutation,
    useTeachersFindMinMutation,
} from '../../../store/csais/csais.api'
import { useAuth } from '../../../hooks/useAuth'
import InputDelay from '../../InputDelay'

// interface IGroupUpdateForm {
//     group_id: string
//     query: any
//     groupID: string
// }

export default function GroupUpdateForm({ setIsOpenUpdate, query, groupID }) {
    const { user } = useAuth()

    const [showed, setShowed] = useState(false)

    const [nameGroup, setNameGroup] = useState<string>('')
    const [nameTeacher, setNameTeacher] = useState<string>('')
    const [dateStart, setDateStart] = useState<string>('')
    const [dateEnd, setDateEnd] = useState<string>('')

    // reduxQ getOneGroup
    const queryFind = useGroupFindIdQuery({ token: user.token, id: groupID })
    // reduxQ updateGroup
    const [updateGroup, updateGroupRes] = useGroupsUpdateMutation()
    // reduxQ findTeacher
    const [findTeacher, findTeacherRes] = useTeachersFindMinMutation()

    // useEffect set actuality data of group
    useEffect(() => {
        setNameGroup(queryFind.data?.[0].name)
        setNameTeacher(queryFind.data?.[0].fullname)
        setDateStart(queryFind.data?.[0].date_create.split('T')[0])
        setDateEnd(queryFind.data?.[0].date_end.split('T')[0])
    }, [queryFind])

    // f() handle updateSubmitGroup
    const updateSubmitGroup = () => {
        updateGroup({
            token: user.token,
            id: groupID,
            name: nameGroup,
            date_create: new Date(dateStart).toISOString().split('T')[0],
            date_end: new Date(dateEnd).toISOString().split('T')[0],
            tutor_name: nameTeacher || queryFind.data?.[0].fullname,
        })
        query.refetch()
        setIsOpenUpdate(false)
    }
    // f() fetch Teachers
    const fethingTeachers = (name: string) => {
        findTeacher({
            token: user.token,
            fullname: name,
        })
    }

    if (queryFind.isError)
        return (
            <p style={{ color: 'red', textAlign: 'center' }}>
                Ошибка получения данных о группе
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
                    value={nameGroup}
                    onChange={(e) => setNameGroup(e.target.value)}
                    placeholder="Название"
                />
                <label>
                    <p style={{ marginBottom: '4px', marginTop: '0px' }}>
                        Дата создания
                    </p>
                    <Input
                        type="date"
                        name="dateStart"
                        value={dateStart}
                        onChange={(e) => setDateStart(e.target.value)}
                    />
                </label>
                <label>
                    <p style={{ marginBottom: '4px', marginTop: '0px' }}>
                        Дата выпуска
                    </p>
                    <Input
                        type="date"
                        name="dateEnd"
                        value={dateEnd}
                        onChange={(e) => setDateEnd(e.target.value)}
                    />
                </label>
                <InputDelay
                    name="teacher"
                    list="teachers"
                    type="text"
                    callback={fethingTeachers}
                    inputing={(value: string) => setNameTeacher(value)}
                    value={nameTeacher}
                    placeholder="Преподаватель"
                />
                <datalist id="teachers">
                    {findTeacherRes.data?.map((teacher) => (
                        <option value={teacher.fullname}></option>
                    ))}
                </datalist>
                <Button onClick={updateSubmitGroup}>
                    <span>Изменить</span>
                </Button>
            </div>
        )
    }
}
