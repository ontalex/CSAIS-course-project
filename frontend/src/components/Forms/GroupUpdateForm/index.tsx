import React, { useEffect, useState } from 'react'

interface IGroupUpdateForm {
    group_id: string
    query: any
    groupID: string
}

export default function GroupUpdateForm() {
    // state nameGroup
    const [nameGroup, setNameGroup] = useState<string>('')
    // state nameTeacher
    const [nameTeacher, setNameTeacher] = useState<string>('')

    // reduxQ getOneGroup
    // reduxQ updateGroup
    // reduxQ findTeacher

    // useEffect set actuality data of group
    useEffect(() => {}, [])

    // f() handle updateSubmitGroup
    let updateSubmitGroup = () => {}
    // f() fetch Teachers
    let fethingTeachers = (name: string) => {}

    // () => Error
    // () => Loading
    // () => Success
}
