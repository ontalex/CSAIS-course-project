import { useState } from 'react'
import list from '../list.module.css'
import Button from '../../../../components/Button'
import Modal from '../../../../components/Modal'
import { useAuth } from '../../../../hooks/useAuth'
import {
    useGroupsAllQuery,
    useGroupsDeleteMutation,
} from '../../../../store/csais/csais.api'
import GroupsItem from '../../../../components/Items/Group'
import { T_group_card } from '../../../../types/csais.types'
import GroupForm from '../../../../components/Forms/GroupForm'
import GroupUpdateForm from '../../../../components/Forms/GroupUpdateForm'

export default function Groups() {
    const [isOpenAdd, setIsOpenAdd] = useState(false) // Modal window
    const [isOpenUpdate, setIsOpenUpdate] = useState(false) // Modal window

    const [updateGroup, setUpdateGroup] = useState()

    const { user } = useAuth()

    const query = useGroupsAllQuery({
        token: user.token,
    })

    const [deleteGroup, deleteGroupRes] = useGroupsDeleteMutation()

    const handleDelete = (id) => {
        deleteGroup({
            token: user.token,
            id: id,
        })
        query.refetch()
    }

    const handleUpdate = (id) => {
        setUpdateGroup(id)
        setIsOpenUpdate(true)
    }

    return (
        <div>
            {user.role == 'staff' && (
                <Button onClick={() => setIsOpenAdd(true)}>+ добавить</Button>
            )}

            <Modal open={isOpenAdd} onClose={() => setIsOpenAdd(false)}>
                <h1>Добавить группу</h1>
                <GroupForm
                    closeWindow={() => setIsOpenAdd(false)}
                    refetchGruops={() => query.refetch()}
                />
            </Modal>

            <Modal open={isOpenUpdate} onClose={() => setIsOpenUpdate(false)}>
                <h1>Изменить группу</h1>
                <GroupUpdateForm
                    setIsOpenUpdate={setIsOpenUpdate}
                    query={query}
                    groupID={updateGroup}
                />
            </Modal>

            <div className={list.list}>
                {query.data?.length === 0 && <p>Нету групп</p>}
                {query.isFetching && <p>Загрузка...</p>}
                {query.data?.map((group: T_group_card) => (
                    <GroupsItem
                        key={group.group_id}
                        name={group.name}
                        group_id={group.group_id}
                        fullname={group.fullname}
                        update={handleUpdate}
                        delete={handleDelete}
                    />
                ))}
            </div>
        </div>
    )
}
