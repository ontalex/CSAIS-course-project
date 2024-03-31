import { useState } from 'react'
import Header from '../../../components/Header'
import MainWrapper from '../../../components/MainWrapper'
import SelectGroup from '../../../components/SelectGroup'
import { store } from '../../../store'

export default function Home() {
    const [group, setGroup] = useState(() => store.getState().group.groupID)
    return (
        <>
            <Header>Главная</Header>
            <MainWrapper>
                <SelectGroup setGroup={setGroup} group={group} />
                {group && <p>ID: {group}</p>}
            </MainWrapper>
        </>
    )
}
