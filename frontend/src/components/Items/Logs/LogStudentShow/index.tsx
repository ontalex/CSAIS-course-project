import React from 'react'
import st from "../style.module.css";
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
        <div className={st.log_box}>
            <p className={st.log_name}>{fullname}</p>
            <p className={st.log_type}>{typeLog.name}</p>
        </div>
    )
}
