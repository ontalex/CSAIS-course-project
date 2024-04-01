import React, { useState } from 'react';
import list from "../list.module.css";
import modal from "../modal.module.css";
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import StudentsItem from '../../../../components/Items/Student';
import Modal from '../../../../components/Modal';
import SelectGroup from '../../../../components/SelectGroup';
import { useAuth } from '../../../../hooks/useAuth';
import { store } from '../../../../store';
import { useStudentsGetQuery, useStudentsAddMutation, useGroupsAllQuery } from '../../../../store/csais/csais.api';
import GroupsItem from '../../../../components/Items/Group';

export default function Groups() {
    const [isOpen, setIsOpen] = useState(false) // Modal window

    const { user } = useAuth()

    const query = useGroupsAllQuery({
        token: user.token
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
            <Button onClick={() => setIsOpen(true)}>+ добавить</Button>

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <form onSubmit={handleSubmit} className={modal.form}>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Название группы"
                    />
                    <Button>Сохранить</Button>
                </form>
            </Modal>

            <div className={list.list}>
                {query.data?.length === 0 && <p>Нету групп</p>}
                {query.data?.map((group) => (
                    <GroupsItem key={group.id} name={group.name}/>
                ))}
            </div>
        </div>
    )
}
