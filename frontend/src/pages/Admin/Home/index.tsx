import { useState } from 'react'
import Header from '../../../components/Header'
import MainWrapper from '../../../components/MainWrapper'
import SelectGroup from '../../../components/Selects/SelectGroup'
import { store } from '../../../store'
import Button from '../../../components/Button'
import { useAuth } from '../../../hooks/useAuth'
import { useLogbookTopQuery } from '../../../store/csais/csais.api'

export default function Home() {
    const [group, setGroup] = useState(() => store.getState().group.groupID)
    return (
        <>
            <Header>Главная</Header>
            <MainWrapper>
                <SelectGroup setGroup={setGroup} group={group} />
                <p>{group}</p>
                <TopLogs />

            </MainWrapper>
        </>
    )
}

function TopLogs() {
    const { user } = useAuth()
    const queryTop = useLogbookTopQuery({
        token: user.token,
        day: new Date().toISOString().split("T")[0],
        group_id: store.getState().group.groupID,
        type_log: "н"
    })
    return (
        <div>
            <div><p>Лидеры прогулов</p><Button>Обновить</Button></div>
            <div>
                {
                    queryTop.data?.map( item => <div key={item.id}>
                        <p>{item.count_logs}</p>
                        <p>{item.fullname}</p>
                    </div> )
                }
            </div>
        </div>
    )
}

function DaySchedule() {
    return (
        <div>
            <div><p>Расписание ()</p><Button>Обновить</Button></div>
            <div>
                <p>{}</p>
            </div>
        </div>
    )
}

function PersentLogs({
    typeLog
} : {
    typeLog: string
}) {

    return (
        <div>
            <div><p>Пороцент посещаемости</p><Button>Обновить</Button></div>
            <div>
                <p>{}</p>
            </div>
        </div>
    )
}