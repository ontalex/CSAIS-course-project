import { useState } from 'react'
import list from '../list.module.css'
import Button from '../../../../components/Button'
import Modal from '../../../../components/Modal'
import { useAuth } from '../../../../hooks/useAuth'
import {
    useGroupsAllQuery,
} from '../../../../store/csais/csais.api'
import GroupsItem from '../../../../components/Items/Group'
import { T_group_card } from '../../../../types/csais.types'
import GroupForm from '../../../../components/GroupForm'

export default function Groups() {
    const [isOpen, setIsOpen] = useState(false) // Modal window 

    const { user } = useAuth()

    const query = useGroupsAllQuery({
        token: user.token,
    })

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>+ добавить</Button>

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <GroupForm closeWindow={() => setIsOpen(false)} refetchGruops={() => query.refetch()} />
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
