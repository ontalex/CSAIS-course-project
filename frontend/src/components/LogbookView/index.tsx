import { times } from 'lodash'
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
                        query.data?.map((item) => (
                            <LogStudent
                                typeLog={'у'}
                                fullname={item.fullname}
                                schedule_id={''}
                                student_id={''}
                            />
                        ))
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
    fullname,
    schedule_id,
    student_id,
}: {
    typeLog: string
    fullname: string
    schedule_id: string
    student_id: string
}) {
    const { user } = useAuth()
    const [addLog, addLogRes] = useLogbookAddMutation()

    /*

    Если log = null, а newlog = "у / н / б / о", то useAdd
    Если log = "у / н / б / о", а newlog = "у / н / б / о", то useUpdate
    Если onClick => Drop, то useDelete

    */

    return (
        <label>
            <p>{fullname}</p>
            <div className={''}>
                <select name="typeLog" id="" value={typeLog}>
                    <option value="у">Уважительная</option>
                    <option value="н">Неуважительная</option>
                    <option value="б">Болезнь</option>
                    <option value="о">Опоздание</option>
                </select>
                {typeLog !== '' && (
                    <Button>
                        <span>Drop</span>
                    </Button>
                )}
            </div>
        </label>
    )
}
