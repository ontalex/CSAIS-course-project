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