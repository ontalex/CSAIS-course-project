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
        }),

        teachersAll: build.query({
            query: (data) => ({
                url: "teachers/all",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + data.token
                },
            })
        }),

        teachersAdd: build.mutation({
            query: (data) => ({
                method: "POST",
                url: "teachers/add",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    fullname: data.fullname,
                    phone: data.phone,
                    email: data.email
                }
            })
        }),

        teachersFind: build.mutation({
            query: (data) => ({
                method: "POST",
                url: "teachers/find",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    fullname: data.fullname
                }

            })
        }),

        teachersDelete: build.mutation({
            query: (data) => ({
                method: "DELETE",
                url: "teachers/delete",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
                }
            })
        }),

        lessonsAll: build.query({
            query: (data) => ({
                method: "GET",
                url: "lessons/all",
                headers: {
                    Authorization: "Bearer " + data.token
                }
            })
        }),

        lessonsAdd: build.mutation({
            query: (data) => ({
                method: "POST",
                url: "lessons/add",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    name: data.name
                }
            })
        }),

        groupsAll: build.query({
            query: (data) => ({
                method: "GET",
                url: "groups/all",
                headers: {
                    Authorization: "Bearer " + data.token
                }
            })
        }),

        groupsAdd: build.mutation({
            query: (data) => ({
                method: "POST",
                url: "groups/add",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    name: data.name,
                    date_create: data.date_create,
                    date_end: data.date_end,
                    fullname: data.fullname
                }
            })
        })

    })
})

export const {
    useTeachersAllQuery,
    useTeachersAddMutation,
    useTeachersFindMutation,
    useTeachersDeleteMutation,
    useLessonsAllQuery,
    useLessonsAddMutation,
    useStudentsGetQuery,
    useStudentsAddMutation,
    useGroupsAllQuery,
    useGroupsAddMutation,
    useAuthMutation,
    useAuthTokenMutation,
    useAccessesGroupsQuery
} = csaisApi;