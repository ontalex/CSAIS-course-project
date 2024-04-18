import React from 'react'
import st from "../style.module.css";
import stylejoin from '../../../../lib/stylejoin';
export default function LogStudentShow({
    typeLog,
    fullname,
}: {
    typeLog: {
        type: string;
        style: string;
        name: string;
      }
    fullname: string
}) {

    return (
        <div className={stylejoin(st.log_box, typeLog.style)}>
            <p className={st.log_name}>{fullname}</p>
            <p className={st.log_type}>{typeLog.name}</p>
        </div>
    )
}
