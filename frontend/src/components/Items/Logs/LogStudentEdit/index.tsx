import React, { SelectHTMLAttributes, useContext } from 'react'
import st from '../style.module.css'
import { useAuth } from '../../../../hooks/useAuth'
import {
    useLogbookAddMutation,
    useLogbookDeleteMutation,
    useLogbookUpdateMutation,
} from '../../../../store/csais/csais.api'
import Button from '../../../Button'
import stylejoin from '../../../../lib/stylejoin'
import { LogsListContext } from '../LogbookView'
export default function LogStudentEdit({
    typeLog,
    fullname,
    schedule_id,
    student_id,
    id,
    refetch,
}: {
    typeLog: {
        type: string
        style: string
        name: string
    }
    fullname: string
    schedule_id: string
    student_id: string
    id: string
    refetch: () => void
}) {
    const { user } = useAuth()
    const [addLog, addLogRes] = useLogbookAddMutation()
    const [updateLog, updateLogRes] = useLogbookUpdateMutation()
    const [deleteLog, deleteLogRes] = useLogbookDeleteMutation()

    const handleSelectLog = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (typeLog.type == 'none') {
            addLog({
                token: user.token,
                type_log: event.target.value,
                schedule_id: schedule_id,
                student_id: student_id,
            })
        } else {
            // console.log("Update Log");
            updateLog({
                token: user.token,
                type_log: event.target.value,
                id: id,
            })
        }
        setTimeout(() => refetch(), 1000)
    }

    const handleDelteLog = () => {
        deleteLog({
            token: user.token,
            id: id,
        })
        setTimeout(() => refetch(), 1000)
    }

    return (
        <label className={stylejoin(st.log_box, typeLog.style)}>
            <p className={st.log_name}>{fullname}</p>
            <div className={st.log_controller}>
                <select
                    className={st.log_select}
                    name="typeLog"
                    id=""
                    value={typeLog.type}
                    onChange={handleSelectLog}
                >
                    <option
                        selected={typeLog.type == 'none'}
                        disabled={typeLog.type != 'none'}
                    >
                        На месте
                    </option>
                    <option value="у">Уважительная</option>
                    <option value="н">Неуважительная</option>
                    <option value="б">Болезнь</option>
                    <option value="о">Опоздание</option>
                </select>
                {typeLog.type !== 'none' && (
                    <Button onClick={handleDelteLog}>
                        <span>Убрать</span>
                    </Button>
                )}
            </div>
        </label>
    )
}
