import { useState } from 'react'
import SelectGroup from '../../../../components/Selects/SelectGroup'
import { store } from '../../../../store'
import {
    useStudentsAddMutation,
    useStudentsDeleteMutation,
    useStudentsGetQuery,
} from '../../../../store/csais/csais.api'
import { useAuth } from '../../../../hooks/useAuth'
import Modal from '../../../../components/Modal'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import StudentsItem from '../../../../components/Items/Student'

import list from '../list.module.css'
import modal from '../modal.module.css'
import InputDelay from '../../../../components/InputDelay'
import StudentUpdateForm from '../../../../components/Forms/StudentUpdateForm'

export default function Students() {
    const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false) // Modal window
    const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false) // Modal window
    const [updateStudentID, setUpdateStudentID] = useState<number | undefined>()

    const { user } = useAuth()
    const [group, setGroup] = useState(() => store.getState().group.groupID)

    const query = useStudentsGetQuery({
        token: user.token,
        group_id: group,
    })
    const [addStudent, addStudentRes] = useStudentsAddMutation()
    // const [updateStudent, updateStudentRes] = useStudentsUpdateMutation()
    const [deleteStudent, deleteStudentRes] = useStudentsDeleteMutation()

    const handleSubmitAdd = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addStudent({
            token: user.token,
            fullname: event.target.elements.fullname.value,
            phone: event.target.elements.phone.value,
            email: event.target.elements.email.value,
            group_id: group,
        })
        setIsOpenAdd(false)
        query.refetch()
    }

    const handleDelete = (id) => {
        deleteStudent({
            token: user.token,
            id: id,
        })
        query.refetch()
    }

    const handleUpdate = (id) => {
        setUpdateStudentID(id)
        setIsOpenUpdate(true)
    }

    return (
        <div>
            <SelectGroup group={group} setGroup={setGroup} />

            <Button onClick={() => setIsOpenAdd(true)}>+ добавить</Button>

            <Modal open={isOpenUpdate} onClose={() => setIsOpenUpdate(false)}>
                <h1>Изменить студента</h1>
                <StudentUpdateForm
                    setIsOpenUpdate={setIsOpenUpdate}
                    query={query}
                    studentID={updateStudentID}
                />
            </Modal>

            <Modal open={isOpenAdd} onClose={() => setIsOpenAdd(false)}>
                <h1>Добавить студента</h1>
                <form onSubmit={handleSubmitAdd} className={modal.form}>
                    <Input
                        type="text"
                        name="fullname"
                        placeholder="ФИО студента"
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

            <div className={list.list}>
                {query.data?.length === 0 && <p>В группе нету студентов</p>}
                {query.isFetching && <p>Загрузка...</p>}
                {query.isSuccess &&
                    query.data?.map((student) => (
                        <StudentsItem
                            key={student.id}
                            id={student.id}
                            fullname={student.fullname}
                            delete={handleDelete}
                            update={handleUpdate}
                        />
                    ))}
            </div>
        </div>
    )
}
