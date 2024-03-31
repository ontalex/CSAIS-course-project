import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TRQ_token, TRQ_login } from "../../types/csais.types";

export const csaisApi = createApi({
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    reducerPath: "csais/api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/',
    }),
    endpoints: build => ({

        auth: build.mutation({
            query: ({ login, password }: TRQ_login) => ({
                url: "auth/login",
                method: "POST",
                body: {
                    login, password
                }
            }),

        }),

        authToken: build.mutation({
            query: (data) => ({
                url: "auth/token",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + data.token
                }
            })
        }),

        accessesGroups: build.query({
            query: (data: TRQ_token) => ({
                url: "groups/accesses",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + data.token
                }
            })
        }),

        studentsGet: build.query({
            query: (data) => ({
                url: "students/all",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    group_id: data.group_id
                },
                "cache": "no-cache"
            })
        }),

        studentsAdd: build.mutation({
            query: (data) => ({
                url: "students/add",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    fullname: data.fullname,
                    phone: data.phone,
                    email: data.email,
                    group_id: data.group_id,
                }
            })
        })

    })
})

export const {
    useStudentsGetQuery,
    useStudentsAddMutation,
    useAuthMutation,
    useAuthTokenMutation,
    useAccessesGroupsQuery
} = csaisApi;