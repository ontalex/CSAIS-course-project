import React from 'react'
import st from '../style.module.css'
import { useAuth } from '../../../../hooks/useAuth'
import { useLogbookAddMutation } from '../../../../store/csais/csais.api'
import Button from '../../../Button'
import stylejoin from '../../../../lib/stylejoin'
export default function LogStudentEdit({
    typeLog,
    fullname,
    schedule_id,
    student_id,
}: {
    typeLog: {
        type: string
        style: string
        name: string
    }
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
        <label className={stylejoin(st.log_box)}>
            <p className={st.log_name}>{fullname}</p>
            <div className={st.log_controller}>
                <select
                    className={st.log_select}
                    name="typeLog"
                    id=""
                    value={typeLog}
                >
                    <option value="у">Уважительная</option>
                    <option value="н">Неуважительная</option>
                    <option value="б">Болезнь</option>
                    <option value="о">Опоздание</option>
                </select>
                {typeLog.type !== 'none' && (
                    <Button>
                        <span>Drop</span>
                    </Button>
                )}
            </div>
        </label>
    )
}
