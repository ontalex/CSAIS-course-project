import { useState } from 'react'
import Header from '../../../components/Header'
import MainWrapper from '../../../components/MainWrapper'
import SelectGroup from '../../../components/SelectGroup'
import { store } from '../../../store'

export default function Logbook() {
    const [group, setGroup] = useState(() => store.getState().group.groupID)
    return (
        <>
            <Header>Журнал</Header>
            <MainWrapper>
                <SelectGroup setGroup={setGroup} group={group} />
                {group && <p>ID: {group}</p>}
            </MainWrapper>
        </>
    )
}
