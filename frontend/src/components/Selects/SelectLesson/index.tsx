import { useAuth } from '../../../hooks/useAuth'
import { useScheduleGetMinQuery } from '../../../store/csais/csais.api'
import Button from '../../Button'

import st from './style.module.css'

export default function SelectLesson({
    group,
    date,
    selected,
    select,
}: {
    group: string | undefined
    date: string
    selected: string | number | undefined
    select: (arg: string) => void
}) {
    const { user } = useAuth()
    const query = useScheduleGetMinQuery({
        token: user.token,
        group_id: group,
        date_lesson: date,
    })

    return (
        <>
            {query.isLoading && <p>Подождите, много уроков...</p>}
            {query.isError && (
                <Button onClick={query.refetch}>
                    Ой, какая-то ошибка. Перезапустить ...
                </Button>
            )}
            {query.isSuccess && !query.isError && (
                <select
                    className={st.select}
                    value={selected}
                    onChange={(event) => select(event.target.value)}
                >
                    {query.data?.length && (
                        <option
                            defaultChecked
                            disabled={selected !== undefined}
                            selected={selected === undefined}
                        >
                            Не выбранно
                        </option>
                    )}

                    {query.data?.length ? (
                        query.data?.map((item) => (
                            <option key={item.id} value={item.id}>
                                #{item.number_lesson}. {item.name}
                            </option>
                        ))
                    ) : (
                        <option disabled selected defaultChecked>
                            Нету расписания
                        </option>
                    )}
                </select>
            )}
        </>
    )
}
