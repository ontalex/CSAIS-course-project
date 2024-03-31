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