import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TRQ_token, TRQ_login, I_Schedule_Add_Send, I_Schedule_Get_Send, I_Schedule_Delete_Send } from "../../types/csais.types";
import { method } from "lodash";

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

        studentsDelete: build.mutation({
            query: (data) => ({
                url: "students/delete",
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
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

        lessonsFind: build.mutation({
            query: (data) => ({
                method: "GET",
                url: "lessons/find",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    name: data.name
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

        lessonsDelete: build.mutation({
            query: (data) => ({
                method: "DELETE",
                url: "lessons/delete",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
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
        }),

        groupsDelete: build.mutation({
            query: (data) => ({
                method: "DELETE",
                url: "groups/delete",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
                }
            })
        }),

        scheduleGet: build.query({
            query: (data: I_Schedule_Get_Send) => ({
                method: "GET",
                url: "schedule/all",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    date_lesson: data.date_lesson,
                    group_id: data.group_id
                }
            })
        }),

        scheduleAdd: build.mutation({
            query: (data: I_Schedule_Add_Send) => ({
                method: "POST",
                url: "schedule/add",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    date_lesson: data.date_lesson
                },
                body: {
                    group_id: data.group_id,
                    room_first: data.room_first,
                    number_lesson: data.number_lesson,
                    lesson_name: data.lesson_name,
                    teachers_fullname_first: data.teachers_fullname_first,
                    room_second: data.room_second,
                    teachers_fullname_second: data.teachers_fullname_second
                }
            })
        }),

        scheduleDelete: build.mutation({
            query: (data: I_Schedule_Delete_Send) => ({
                method: "DELETE",
                url: "schedule/delete",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
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
    useLessonsDeleteMutation,
    useLessonsFindMutation,

    useStudentsGetQuery,
    useStudentsAddMutation,
    useStudentsDeleteMutation,

    useGroupsAllQuery,
    useGroupsAddMutation,
    useGroupsDeleteMutation,

    useAuthMutation,
    useAuthTokenMutation,
    useAccessesGroupsQuery,

    useScheduleGetQuery,
    useScheduleAddMutation,
    useScheduleDeleteMutation,
} = csaisApi;