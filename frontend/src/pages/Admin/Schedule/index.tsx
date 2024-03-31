import { useState } from 'react'
import Header from '../../../components/Header'
import MainWrapper from '../../../components/MainWrapper'
import { store } from '../../../store'
import SelectGroup from '../../../components/SelectGroup'

export default function Schedule() {
    const [group, setGroup] = useState(() => store.getState().group.groupID)

    return (
        <>
            <Header>Расписание</Header>
            <MainWrapper>
                <SelectGroup setGroup={setGroup} group={group} />
                {group && <p>ID: {group}</p>}
            </MainWrapper>
        </>
    )
}
