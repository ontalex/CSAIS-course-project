import React, { useState } from 'react'
import Input from '../../../../components/Input'
import Modal from '../../../../components/Modal'
import { useAuth } from '../../../../hooks/useAuth'
import {
    useTeachersAllQuery,
    useTeachersAddMutation,
    useLessonsAllQuery,
    useLessonsAddMutation,
} from '../../../../store/csais/csais.api'

export default function Lessons() {
    const [isOpen, setIsOpen] = useState(false) // Modal window

    const { user } = useAuth()

    const query = useLessonsAllQuery({
        token: user.token,
    })
    const [addLessons, addLessonsRes] = useLessonsAddMutation()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addLessons({
            token: user.token,
            name: event.target.elements.name.value,
        })
        query.refetch()
        setIsOpen(false)
    }

    return (
        <div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Название предмета"
                    />
                    <button>Сохранить</button>
                </form>
            </Modal>
            <div>
                {query.data?.length === 0 && <p>Нету дисциплин</p>}
                {query.data?.map(
                    (lessons: {
                        id: React.Key | null | undefined
                        name: string
                    }) => <p key={lessons.id}>{lessons.name}</p>
                )}
            </div>
        </div>
    )
}
