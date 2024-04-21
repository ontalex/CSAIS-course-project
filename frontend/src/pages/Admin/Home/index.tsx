import { useState } from 'react'
import Header from '../../../components/Header'
import MainWrapper from '../../../components/MainWrapper'
import SelectGroup from '../../../components/Selects/SelectGroup'
import { store } from '../../../store'
import TopLogs from '../../../components/widgets/TopLogs'
import DaySchedule from '../../../components/widgets/DaySchedule'
import PercentLogs from '../../../components/widgets/PercentLogs'

import st from './style.module.css'

export default function Home() {
    const [group, setGroup] = useState(() => store.getState().group.groupID)
    return (
        <>
            <Header>Главная</Header>
            <MainWrapper>
                <SelectGroup setGroup={setGroup} group={group} />
                {/* <p>{group}</p> */}
                <div className={st.grid}>
                    <PercentLogs typeLog={'н'} />
                    <TopLogs />
                    <DaySchedule />
                </div>
            </MainWrapper>
        </>
    )
}
