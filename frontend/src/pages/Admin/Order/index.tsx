import React, { useEffect, useRef, useState } from 'react'
import Header from '../../../components/Header'
import MainWrapper from '../../../components/MainWrapper'
import SelectGroup from '../../../components/Selects/SelectGroup'
import { store } from '../../../store'
import SelectDate from '../../../components/Selects/SelectDate'

import st from './style.module.css'
import { useOrderGetMaxMutation } from '../../../store/csais/csais.api'
import { useAuth } from '../../../hooks/useAuth'
import Button from '../../../components/Button'

type TTableOrder = {
    date_start: string
    date_end: string
    group_id: string | undefined
    type: 'min' | 'max'
}

export interface RootInterface {
    date_start: string
    date_end: string
    tutor: string
    editor: string
    lessons: Lesson[]
    students: Student[]
}

export interface Student {
    student_fullname: string
    logs: string[]
    total: Total
}

export interface Total {
    disease: number
    respectfully: number
    disrespectful: number
    delays: number
}

export interface Lesson {
    lesson_id: number
    lesson_date: string
    lesson_number: number
    lesson_name: string
}

function TableOrder({ date_start, date_end, group_id, type }: TTableOrder) {
    const { user } = useAuth()
    const refTable = useRef(null)
    const [order, orderReq] = useOrderGetMaxMutation()
    const handlerGetData = () => {
        order({
            token: user.token,
            day_start: date_start,
            day_end: date_end,
            group_id: group_id,
            type: type,
        })
    }

    const getFile = (data) => {
        const link = document.createElement('a')
        link.download = `report_${date_start}_${date_end}.xls`

        const blob = new Blob(
            [
                `<htmlxmlns:o="urn:schemas-microsoft-com:office:office"xmlns:x="urn:schemas-microsoft-com:office:excel"xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>2023-10-02 - 2023-10-08</x:Name><x:WorksheetOptions><x:DisplayGridlines /></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table border="1" cellSpacing="0" cellPadding="4">${data}</table></body></html>`,
            ],
            { type: 'application/vnd.ms-excel' }
        )

        link.href = URL.createObjectURL(blob)

        link.click()

        URL.revokeObjectURL(link.href)
    }

    useEffect(() => {
        console.log(orderReq?.data)
    }, [orderReq])
    return (
        <div>
            <Button onClick={handlerGetData}>
                <span>Получить</span>
            </Button>
            {orderReq.isError && (
                <p style={{ textAlign: 'center', color: 'red' }}>
                    (Код {orderReq.error?.status}) -
                    <>{orderReq.error?.data.message}</>
                </p>
            )}
            {orderReq.isLoading && (
                <p style={{ textAlign: 'center' }}>Загрузка...</p>
            )}
            {Boolean(orderReq?.data) && (
                <Button onClick={() => getFile(refTable.current.innerHTML)}>
                    <span>Скачать XLS</span>
                </Button>
            )}
            {Boolean(orderReq?.data) && (
                <div className={st.table}>
                    <table
                        border={1}
                        cellSpacing={0}
                        cellPadding={4}
                        ref={refTable}
                    >
                        <>
                            <caption>
                                Отчёт с {orderReq?.data.date_start} по{' '}
                                {orderReq?.data.date_end}
                            </caption>
                            <thead>
                                <tr>
                                    <th rowSpan={3}>
                                        {orderReq?.data.group_name}
                                    </th>
                                    {orderReq?.data.lessons.map(
                                        (item: Lesson) => (
                                            <th>
                                                {new Date(
                                                    item.lesson_date
                                                ).toLocaleDateString('ru', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                })}
                                            </th>
                                        )
                                    )}
                                    <th rowSpan={3}>Опоздания</th>
                                    <th rowSpan={3}>У (по уважительной)</th>
                                    <th rowSpan={3}>Н (по не уважительной)</th>
                                    <th rowSpan={3}>Б (по болезни)</th>
                                    <th rowSpan={3}>
                                        Всего академических часов
                                    </th>
                                </tr>
                                <tr>
                                    {orderReq?.data.lessons.map(
                                        (item: Lesson) => (
                                            <th style={{ maxWidth: '200px' }}>
                                                {item.lesson_name}
                                            </th>
                                        )
                                    )}
                                </tr>
                                <tr>
                                    {orderReq?.data.lessons.map(
                                        (item: Lesson) => (
                                            <th>{item.lesson_number}</th>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {orderReq?.data.students.map(
                                    (item: Student) => (
                                        <tr>
                                            <td className={st.table_student}>
                                                {item.student_fullname}
                                            </td>
                                            {item.logs.map((item) => (
                                                <td>{item || ' '}</td>
                                            ))}
                                            <td style={{ textAlign: 'center' }}>
                                                {item.total.delays}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {item.total.respectfully}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {item.total.disrespectful}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {item.total.disease}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                {item.total.respectfully +
                                                    item.total.disrespectful +
                                                    item.total.disease}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Куратор</th>
                                    <td colSpan={4}>{orderReq?.data.tutor}</td>
                                    <td colSpan={3}> </td>
                                </tr>
                                <tr>
                                    <th>Оформил(а)</th>
                                    <td colSpan={4}>{orderReq?.data.editor}</td>
                                    <td colSpan={3}> </td>
                                </tr>
                            </tfoot>
                        </>
                    </table>
                </div>
            )}
        </div>
    )
}

export default function Order() {
    const [group, setGroup] = useState(() => store.getState().group.groupID)
    const [dateStart, setDateStart] = useState(
        () => new Date().toISOString().split('T')[0]
    )
    const [dateEnd, setDateEnd] = useState(
        () => new Date().toISOString().split('T')[0]
    )
    const [type, setType] = useState<'min' | 'max'>('max')
    return (
        <>
            <Header>Отчёты</Header>
            <MainWrapper>
                <>
                    <SelectGroup setGroup={setGroup} group={group} />
                    <div className={st.form_date}>
                        <SelectDate setDate={setDateStart} date={dateStart} />
                        <SelectDate setDate={setDateEnd} date={dateEnd} />
                    </div>
                    <div className={st.form}>
                        <p className={st.form_name}>Тип отчёта</p>
                        <select
                            value={type}
                            onChange={(event) => setType(event.target.value)}
                            className={st.form_select}
                        >
                            <option value="max">Полный</option>
                            <option value="min">Только итоги</option>
                        </select>
                    </div>
                    <div className={st.form_options}></div>
                    {new Date(dateStart) > new Date(dateEnd) ? (
                        <p>Дата начала не может быть больше даты окончания!</p>
                    ) : (
                        <TableOrder
                            date_start={dateStart}
                            date_end={dateEnd}
                            group_id={group}
                            type={type}
                        />
                    )}
                </>
            </MainWrapper>
        </>
    )
}
