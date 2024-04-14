import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TRQ_answer_auth } from "./csais.types";

export interface ISignin {
    user: any,
    cb: () => void,
    errorCb: ({
        error,
        isError,
    }: {
        error: FetchBaseQueryError | SerializedError | undefined
        isError: boolean
    }) => void
}

export interface IAuthContext { user: TRQ_answer_auth, signin: ISignin, signout, check, isAuth, setIsAuth }