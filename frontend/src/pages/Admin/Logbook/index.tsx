import { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import MainWrapper from '../../../components/MainWrapper'
import SelectGroup from '../../../components/Selects/SelectGroup'
import { store } from '../../../store'
import SelectDate from '../../../components/Selects/SelectDate'
import { useLogbookDayQuery } from '../../../store/csais/csais.api'
import { useAuth } from '../../../hooks/useAuth'
import Button from '../../../components/Button'
import SelectLesson from '../../../components/Selects/SelectLesson'
import LogbookView from '../../../components/LogbookView'

export default function Logbook() {
    const [group, setGroup] = useState(() => store.getState().group.groupID)
    const [date, setDate] = useState(
        () => new Date().toISOString().split('T')[0]
    )
    const [lesson, setLesson] = useState()

    // useEffect(() => {
    //     console.log(group, date, lesson)
    // }, [date, group, lesson])

    useEffect(() => {
        setLesson(undefined)
    }, [date, group])

    return (
        <>
            <Header>Журнал</Header>
            <MainWrapper>
                <SelectGroup setGroup={setGroup} group={group} />
                <SelectDate setDate={setDate} date={date} />
                <SelectLesson
                    group={group}
                    date={date}
                    selected={lesson}
                    select={setLesson}
                />
                {date && lesson && group ? (
                    <LogbookView group={group} lesson={lesson} />
                ) : (
                    <>
                        <p style={{ textAlign: 'center' }}>
                            Нельзя показать журнал.
                        </p>
                        <p style={{ textAlign: 'center' }}>
                            Нужно выбрать группу, день и урок из расписания.
                        </p>
                    </>
                )}
            </MainWrapper>
        </>
    )
}
