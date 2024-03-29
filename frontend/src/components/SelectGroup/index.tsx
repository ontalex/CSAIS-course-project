import React, { useEffect, useState } from 'react'
import st from './select.module.css'

type DataListOption = {
    name: string
    value: string
}

type SelectProps = {
    datalist: DataListOption[]
    value: string
    onSelect: (event: React.InputHTMLAttributes<HTMLInputElement>) => void
}

export default function Select({ datalist, onSelect, value }: SelectProps) {
    // let [groups, setGroups] = useState()

    useEffect(() => {}, [])

    return (
        <select
            className={st.select}
            id="select_list"
            value={value}
            onSelect={onSelect}
        >
            {datalist?.map((optionObject) => (
                <option value={optionObject.value}>{optionObject.name}</option>
            ))}
        </select>
    )
}
