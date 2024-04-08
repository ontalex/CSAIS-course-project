// import React, { useEffect, useState } from 'react'
import st from './select.module.css'
import { useAccessesGroupsQuery } from '../../../store/csais/csais.api'
import { useAuth } from '../../../hooks/useAuth'
import { groupSlice } from '../../../store/csais/groupData.slice'
import { store } from '../../../store'
import React, { useEffect } from 'react'

interface ISelectOption {
    id: string
    name: string
}

interface ISelectGroupProps {
    setGroup: (id: string) => void
    group?: string
}

export default function SelectGroup({ setGroup, group }: ISelectGroupProps) {
    const { user } = useAuth()

    const query = useAccessesGroupsQuery({
        token: user.token || localStorage.getItem('token'),
    })

    const handlerGroups = (event: React.ChangeEvent<HTMLSelectElement>) => {
        store.dispatch(
            groupSlice.actions.setGroup({ groupID: event.target.value })
        )
        setGroup(event.target.value)
    }

    useEffect(() => {
        setGroup(store.getState().group.groupID)
    })

    return (
        <select
            className={st.select}
            id="select_list"
            value={store.getState().group.groupID}
            onChange={handlerGroups}
        >
            <option disabled selected>
                Доступные группы
            </option>
            {query.data?.map((optionObject: ISelectOption) => (
                <option value={optionObject.id} key={optionObject.id}>
                    {optionObject.name}
                </option>
            ))}
        </select>
    )
}
