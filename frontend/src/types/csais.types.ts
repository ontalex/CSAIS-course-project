export type TRQ_login = {
    login: string,
    password: string
}

export type TRQ_answer_auth = {
    role: string | undefined | null,
    token: string | undefined | null
}

export type TRQ_token = {
    token: string
}

export type T_teacher_option = { id: string, fullname: string };
export type T_group_card = { id: string, name: string };

export interface I_Schedule_Get_Send {
    token: string,
    date_lesson: string,
    group_id: string
}

export interface I_Schedule_Add_Send {
    group_id: number,
    token: string,
    date_lesson: string,
    room_first: string,
    number_lesson: string,
    lesson_name: string,
    teachers_fullname_first: string,
    room_second?: string,
    teachers_fullname_second?: string,
}

export interface I_Schedule_Delete_Send {
    token: string,
    id: number | string
}