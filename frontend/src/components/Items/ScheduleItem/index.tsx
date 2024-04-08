import { FC } from 'react'
import { IScheduleItem } from '../../../types/props.type'

import st from './style.module.css'
import Button from '../../Button'

const timeList = {
    1: '9:00 - 10:30',
    2: '10:50 - 12:20',
    3: '12:40 - 14:10',
    4: '14:30 - 16:00',
    5: '16:10 - 17:40',
}

const ScheduleItem: FC<IScheduleItem> = (props) => {
    return (
        <div className={st.item}>
            <div className={st.header}>
                <p>№{props.number_lesson}</p>
                <p>{timeList[props.number_lesson]}</p>
            </div>
            <div className={st.main}>
                <div className={st.info}>
                    <h1 className={st.lesson}>{props.name}</h1>
                    <div className={st.groups}>
                        <div className={st.group}>
                            <p>{props.teacher_first}</p>
                            <p>Аудитория {props.room_first}</p>
                        </div>
                        {props.teacher_second && (
                            <div className={st.group}>
                                <p>{props.teacher_second}</p>
                                <p>Аудитория {props.room_second}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className={st.btns}>
                    <Button onClick={() => props.openEdit(props.number_lesson)}>
                        <span>Изменить</span>
                    </Button>
                    <Button onClick={() => props.delete(props.id)}>
                        <span>Удалить</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ScheduleItem
