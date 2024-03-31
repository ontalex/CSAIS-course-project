import { useState } from 'react'
import SelectGroup from '../../../../components/SelectGroup'
import { store } from '../../../../store'
import {
    useStudentsAddMutation,
    useStudentsGetQuery,
} from '../../../../store/csais/csais.api'
import { useAuth } from '../../../../hooks/useAuth'
import Modal from '../../../../components/Modal'
import Input from '../../../../components/Input'

export default function Students() {
    const [isOpen, setIsOpen] = useState(false) // Modal window

    const { user } = useAuth()
    const [group, setGroup] = useState(() => store.getState().group.groupID)

    const query = useStudentsGetQuery({
        token: user.token,
        group_id: group,
    })
    const [addStudent, addStudentRes] = useStudentsAddMutation()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addStudent({
            token: user.token,
            fullname: event.target.elements.fullname.value,
            phone: event.target.elements.phone.value,
            email: event.target.elements.email.value,
            group_id: group,
        })
        setIsOpen(false)
        query.refetch()
    }

    return (
        <div>
            <SelectGroup group={group} setGroup={setGroup} />

            <button onClick={() => setIsOpen(true)}>+ добавить</button>

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <form onSubmit={handleSubmit}>
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
                    <button>Сохранить</button>
                </form>
            </Modal>

            <div>
                {query.data?.length === 0 && <p>В группе нету студентов</p>}
                {query.data?.map((student) => (
                    <p key={student.id}>{student.fullname}</p>
                ))}
            </div>
        </div>
    )
}
