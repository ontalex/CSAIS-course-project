import React from 'react'
import st from './style.module.css'

export default function Input({
    ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input className={st.form_input} {...props} />
}
