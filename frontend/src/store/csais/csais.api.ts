import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TRQ_token, TRQ_login, I_Schedule_Add_Send, I_Schedule_Get_Send, I_Schedule_Delete_Send } from "../../types/csais.types";
// import { method } from "lodash";

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
            transformErrorResponse: (data) => {
                console.log(data);
                return data
            }

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
            }),

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
                cache: "no-cache"
            })
        }),

        studentOne: build.query({
            query: (data) => ({
                url: "students/one",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
                }
            })
        }),

        studentUpdate: build.mutation({
            query: (data) => ({
                url: "students/update",
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    fullname: data.fullname,
                    phone: data.phone,
                    email: data.email,
                    group_name: data.group_name
                },
                params: {
                    id: data.id
                }
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

        teachersUpdate: build.mutation({
            query: (data) => ({
                method: "PUT",
                url: "teachers/update",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    fullname: data.fullname,
                    phone: data.phone,
                    email: data.email
                },
                params: {
                    id: data.id
                }
            })
        }),

        teachersFind: build.query({
            query: (data) => ({
                method: "GET",
                url: "teachers/find",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
                }
            })
        }),

        teachersFindMin: build.mutation({
            query: (data) => ({
                method: "POST",
                url: "teachers/find/min",
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

        groupOne: build.query({
            query: (data) => ({
                method: "GET",
                url: "groups/one",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
                }
            })
        }),

        groupsFind: build.mutation({
            query: (data: { token: string, name: string }) => ({
                method: "GET",
                url: "groups/find",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    name: data.name
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

        scheduleGetMin: build.query({
            query: (data: I_Schedule_Get_Send) => ({
                method: "GET",
                url: "schedule/min",
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
        }),

        logbookDay: build.query({
            query: (data) => ({
                method: "GET",
                url: "logbook/day",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    schedule_id: data.schedule_id,
                    group_id: data.group_id
                }
            })
        }),

        logbookAdd: build.mutation({
            query: (data) => ({
                method: "POST",
                url: "logbook/add",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    type_log: data.type_log,
                    schedule_id: data.schedule_id
                }
            })
        })

    })
})

export const {
    useTeachersAllQuery,
    useTeachersFindQuery,
    useTeachersAddMutation,
    useTeachersFindMinMutation,
    useTeachersDeleteMutation,
    useTeachersUpdateMutation,

    useLessonsAllQuery,
    useLessonsAddMutation,
    useLessonsDeleteMutation,
    useLessonsFindMutation,

    useStudentOneQuery,
    useStudentsGetQuery,
    useStudentsAddMutation,
    useStudentsDeleteMutation,
    useStudentUpdateMutation,

    useGroupOneQuery,
    useGroupsAllQuery,
    useGroupsAddMutation,
    useGroupsDeleteMutation,
    useGroupsFindMutation,

    useAuthMutation,
    useAuthTokenMutation,
    useAccessesGroupsQuery,

    useScheduleGetQuery,
    useScheduleGetMinQuery,
    useScheduleAddMutation,
    useScheduleDeleteMutation,

    useLogbookDayQuery,
    useLogbookAddMutation
} = csaisApi;