import React, { useRef, useState } from 'react'
import st from './style.module.css'

interface ISelectDate {
    setDate: (newDate: string) => void
    date: string
}

export default function SelectDate({ setDate, date }: ISelectDate) {
    const inputRef = useRef()

    const handlePrevDay = () => {
        let dateValue = new Date(date)
        let day = dateValue.getDate()
        dateValue.setDate(day - 1)

        inputRef.current.value = dateValue.toISOString().split('T')[0]

        setDate(dateValue.toISOString().split('T')[0])
    }

    const handleNextDay = () => {
        let dateValue = new Date(date)
        let day = dateValue.getDate()
        dateValue.setDate(day + 1)

        console.log(dateValue)
        console.log(inputRef.current)
        inputRef.current.value = dateValue.toISOString().split('T')[0]

        setDate(dateValue.toISOString().split('T')[0])
    }

    const handleChangeDay = (event) => {
        setDate(new Date(event.target.value).toISOString().split('T')[0])
    }

    return (
        <div className={st.box}>
            <button className={st.btn} onClick={handlePrevDay}>
                Prev
            </button>
            <label className={st.wrapper}>
                <p className={st.wrapper_date}>
                    {new Intl.DateTimeFormat('ru', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    }).format(new Date(date))}
                </p>
                <input
                    className={st.wrapper_input}
                    onChange={handleChangeDay}
                    type="date"
                    ref={inputRef}
                    value={date}
                />
            </label>
            <button className={st.btn} onClick={handleNextDay}>
                Next
            </button>
        </div>
    )
}
