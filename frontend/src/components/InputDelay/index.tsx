import { debounce } from 'lodash'

import st from './style.module.css'
import React from 'react'

export default function InputDelay({ callback, value, inputing, ...props }) {
    const debouncedOnChange = React.useRef(debounce(callback, 1500)).current
    React.useEffect(() => {
        return () => {
            debouncedOnChange.cancel()
        }
    }, [debouncedOnChange])
    return (
        <>
            <input
                className={st.form_input}
                value={value}
                onChange={(e) => {
                    inputing(e.target.value)
                    debouncedOnChange(e.target.value)
                }}
                {...props}
            />
        </>
    )
}
