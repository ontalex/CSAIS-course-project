import { useAuth } from '../../../hooks/useAuth'
import stylejoin from '../../../lib/stylejoin'
import { store } from '../../../store'
import { useScheduleGetQuery } from '../../../store/csais/csais.api'
import Button from '../../Button'

import st from '../style.module.css'

export default function DaySchedule() {
    const { user } = useAuth()
    const querySchedule = useScheduleGetQuery({
        token: user.token,
        date_lesson: new Date().toISOString().split('T')[0],
        group_id: store.getState().group.groupID,
    })
    return (
        <div className={stylejoin(st.card)}>
            <div className={st.card_head}>
                <p className={st.card_name}>
                    Расписание (
                    {new Date().toLocaleDateString('ru-Ru', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                    )
                </p>
                <Button onClick={querySchedule.refetch}>Обновить</Button>
            </div>
            <div
                className={stylejoin(
                    st.card_body,
                    st.card_list,
                    st.max_height_3n4
                )}
            >
                {Boolean(querySchedule.data?.length == 0) && (
                    <p className={st.data_none}>Нету данных</p>
                )}
                {Boolean(querySchedule.data?.length > 0) &&
                    querySchedule.data?.map((schedule) => (
                        <>
                            {/* <p>{JSON.stringify(schedule)}</p> */}
                            <div className={st.list_item}>
                                <p>#{schedule.number_lesson}</p>
                                <p>{schedule.name}</p>
                                <p>
                                    {schedule.teacher_first} (
                                    {schedule.room_first})
                                </p>
                                {schedule.teacher_second && (
                                    <p>
                                        {schedule.teacher_second} (
                                        {schedule.room_second})
                                    </p>
                                )}
                            </div>
                        </>
                    ))}
            </div>
        </div>
    )
}
