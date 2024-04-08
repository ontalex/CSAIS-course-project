import { useState } from 'react'
import Header from '../../../components/Header'
import MainWrapper from '../../../components/MainWrapper'
import { store } from '../../../store'
import SelectGroup from '../../../components/Selects/SelectGroup'
import SelectDate from '../../../components/Selects/SelectDate'
import { ScheduleView } from '../../../components/ScheduleView'

export default function Schedule() {
    const [group, setGroup] = useState(() => store.getState().group.groupID)
    const [date, setDate] = useState(
        () => new Date().toISOString().split('T')[0]
    )

    return (
        <>
            <Header>Расписание</Header>
            <MainWrapper>
                <SelectGroup setGroup={setGroup} group={group} />
                <SelectDate setDate={setDate} date={date} />
                <ScheduleView date={date} group={group} />
            </MainWrapper>
        </>
    )
}
