import { FC } from 'react'
import st from './style.module.css'
import Button from '../../Button'

const timeList = {
    '1': '09:00 - 10:30',
    '2': '10:50 - 12:20',
    '3': '12:40 - 14:10',
    '4': '14:30 - 16:00',
    '5': '16:10 - 17:40',
}

interface IScheduleItemNone {
    number_lesson: number
    onOpenWindow: () => void
}

function ScheduleItemNone(props: IScheduleItemNone) {
    return (
        <div className={st.item}>
            <div className={st.header}>
                <p>№{props.number_lesson}</p>
                <p>{timeList[props.number_lesson]}</p>
            </div>
            <div className={st.main}>
                <div className={st.info}>
                    <p>Урока нету</p>
                </div>
                <div className={st.btns}>
                    <Button onClick={props.onOpenWindow}>
                        <span>Добавить</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ScheduleItemNone
