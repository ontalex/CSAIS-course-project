import { useAuth } from '../../hooks/useAuth'
import {
    useLogbookAddMutation,
    useLogbookDayQuery,
} from '../../store/csais/csais.api'
import Button from '../Button'

export default function LogbookView({
    group,
    lesson,
}: {
    group: string | undefined
    lesson: string | undefined
}) {
    const { user } = useAuth()
    const query = useLogbookDayQuery({
        token: user.token,
        schedule_id: lesson,
        group_id: group,
    })

    const typeLogs = [{}]

    return (
        <>
            {query.isLoading && <p>Подождите, большой журнал...</p>}
            {query.isError && (
                <Button onClick={query.refetch}>
                    Ой, какая-то ошибка. Перезапустить ...
                </Button>
            )}
            {query.isSuccess && !query.isError && (
                <div>
                    {query.data?.length ? (
                        query.data?.map((item) => <p>{item.fullname}</p>)
                    ) : (
                        <>
                            <p>
                                Студентов в группе нету. Проверьте таблицу
                                студентов
                            </p>
                            <Button onClick={query.refetch}>
                                Или перезагрузите
                            </Button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

function LogStudent({
    typeLog,
    schedule_id,
    student_id,
}: {
    typeLog: string
    schedule_id: string
    student_id: string
}) {
    const { user } = useAuth()
    const [addLog, addLogRes] = useLogbookAddMutation()

    // const handleTypeLog = (event) => {
    //     if() {

    //     } else if {

    //     } else {

    //     }
    // }
}
