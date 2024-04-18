import { times } from 'lodash'
import { useAuth } from '../../../../hooks/useAuth'
import {
    useLogbookAddMutation,
    useLogbookDayQuery,
} from '../../../../store/csais/csais.api'
import Button from '../../../Button'
import { useEffect } from 'react'
import LogStudentShow from '../LogStudentShow'
import LogStudentEdit from '../LogStudentEdit'

import st from "../style.module.css";

export default function LogbookView({
    group,
    lesson,
}: {
    group: string | undefined
    lesson: string
}) {
    const { user } = useAuth()
    const query = useLogbookDayQuery({
        token: user.token,
        schedule_id: lesson,
        group_id: group,
    })

    const typeLogs = {
        у: {
            type: "у",
            style: st.log_type_u,
            name: "Уважительная"
        },
        н: {
            type: "н",
            style: st.log_type_n,
            name: "Неуважительная"
        },
        б: {
            type: "б",
            style: st.log_type_b,
            name: "Болезнь"
        },
        о: {
            type: "о",
            style: st.log_type_o,
            name: "Опоздание"
        },
        none: {
            type: "none",
            style: st.log_type_none,
            name: "На месте"

        }
    };

    return (
        <>
            {query.isLoading && <p>Подождите, большой журнал...</p>}
            {query.isError && (
                <Button onClick={query.refetch}>
                    Ой, какая-то ошибка. Перезапустить ...
                </Button>
            )}
            {query.isSuccess && !query.isError && (
                <div className={st.log_list}>
                    {query.data?.length ? (
                        query.data?.map((item) =>
                            user.role == 'staff' ? (
                                <LogStudentShow
                                    typeLog={typeLogs[item.type_log ?? "none"]}
                                    fullname={item.fullname}
                                />
                            ) : (
                                <LogStudentEdit
                                    typeLog={typeLogs[item.type_log ?? "none"]}
                                    fullname={item.fullname}
                                    schedule_id={lesson}
                                    student_id={item.id}
                                />
                            )
                        )
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