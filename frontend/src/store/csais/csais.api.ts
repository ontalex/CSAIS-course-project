import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TRQ_token, TRQ_login, I_Schedule_Add_Send, I_Schedule_Get_Send, I_Schedule_Delete_Send } from "../../types/csais.types";
import { method } from "lodash";
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

        olderActive: build.mutation({
            query: (data) => ({
                url: "olders/active",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    student_id: data.id,
                }
            })
        }),
        olderOff: build.mutation({
            query: (data) => ({
                url: "olders/off",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    student_id: data.id,
                }
            })
        }),
        olderCreate: build.mutation({
            query: (data) => ({
                url: "olders/create",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    student_id: data.id,
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

        lessonsFindId: build.query({
            query: (data) => ({
                method: "GET",
                url: "lessons/find/id",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
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

        lessonUpdate: build.mutation({
            query: (data) => ({
                method: "PUT",
                url: "lessons/update",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
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

        groupFindId: build.query({
            query: (data) => ({
                method: "GET",
                url: "groups/find/id",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
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

        groupsUpdate: build.mutation({
            query: (data) => ({
                method: "PUT",
                url: "groups/update",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    name: data.name,
                    date_create: data.date_create,
                    date_end: data.date_end,
                    tutor_name: data.tutor_name
                },
                params: {
                    id: data.id
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

        scheduleFindId: build.query({
            query: (data) => ({
                method: "GET",
                url: "schedule/find/id",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
                },
            })
        }),

        scheduleUpdate: build.mutation({
            query: (data) => ({
                method: "PUT",
                url: "schedule/update",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
                },
                body: {
                    room_first: data.room_first,
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
                    student_id: data.student_id,
                    schedule_id: data.schedule_id
                }
            })
        }),

        logbookUpdate: build.mutation({
            query: (data) => ({
                method: "PUT",
                url: "logbook/update",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    type_log: data.type_log,
                },
                params: {
                    id: data.id
                }
            })
        }),

        logbookDelete: build.mutation({
            query: (data) => ({
                method: "DELETE",
                url: "logbook/delete",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    id: data.id
                }
            })
        }),

        logbookTop: build.query({
            query: (data) => ({
                method: "POST",
                url: "logbook/top",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                body: {
                    day: data.day,
                    group_id: data.group_id,
                    type_log: data.type_log
                }
            })
        }),

        logbookPercent: build.query({
            query: (data) => ({
                method: "GET",
                url: "logbook/percent",
                headers: {
                    Authorization: "Bearer " + data.token
                },
                params: {
                    day: data.day,
                    group_id: data.group_id,
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
    useLessonsFindIdQuery,
    useLessonsAddMutation,
    useLessonsDeleteMutation,
    useLessonsFindMutation,
    useLessonUpdateMutation,

    useStudentOneQuery,
    useStudentsGetQuery,
    useStudentsAddMutation,
    useStudentsDeleteMutation,
    useStudentUpdateMutation,

    useOlderActiveMutation,
    useOlderCreateMutation,
    useOlderOffMutation,

    useGroupOneQuery,
    useGroupFindIdQuery,
    useGroupsAllQuery,
    useGroupsAddMutation,
    useGroupsDeleteMutation,
    useGroupsFindMutation,
    useGroupsUpdateMutation,

    useAuthMutation,
    useAuthTokenMutation,
    useAccessesGroupsQuery,

    useScheduleGetQuery,
    useScheduleGetMinQuery,
    useScheduleFindIdQuery,
    useScheduleAddMutation,
    useScheduleDeleteMutation,
    useScheduleUpdateMutation,

    useLogbookDayQuery,
    useLogbookAddMutation,
    useLogbookUpdateMutation,
    useLogbookDeleteMutation,
    useLogbookTopQuery,
    useLogbookPercentQuery
} = csaisApi;