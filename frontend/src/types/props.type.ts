export type T_Props = {
    children?: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[] | React.ReactPortal
    isLoading?: boolean
}

export interface IScheduleItem {
    id: number
    number_lesson: number
    date_lesson: string
    group_id: number
    name: string
    teacher_first: string
    teacher_second?: string
    room_first: string
    room_second?: string

    openEdit: (number_lesson: number) => void
    delete: (number_lesson: number) => void
}