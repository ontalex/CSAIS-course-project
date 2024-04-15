import { useEffect, useState } from 'react'
import InputDelay from '../../InputDelay'
import Input from '../../Input'
import {
    useGroupFindIdQuery,
    useLessonsFindMutation,
    useScheduleAddMutation,
    useScheduleFindIdQuery,
    useScheduleUpdateMutation,
    useTeachersFindMinMutation,
} from '../../../store/csais/csais.api'
import { useAuth } from '../../../hooks/useAuth'
import Button from '../../Button'
import { store } from '../../../store'

import st from './style.module.css'

interface IGroupScheduleUpdate {
    closeWindow: () => void
    refetch: () => void
    scheduleID: string | number | undefined
    // dateLesson: string
    // lessonNumber: string | number
}

export default function GroupScheduleUpdate({
    closeWindow,
    refetch,
    scheduleID,
}: IGroupScheduleUpdate) {
    const { user } = useAuth()

    // Данные для отправки
    const [teacherFirst, setTeacherFirst] = useState<string>('')
    const [teacherSecond, setTeacherSecond] = useState<string>('')
    const [roomFirst, setRoomFirst] = useState<string>('')
    const [roomSecond, setRoomSecond] = useState<string>('')
    const [lesson, setLesson] = useState<string>('')

    const [canSend, setCanSend] = useState<boolean>(false)

    // API запросы
    const [findTeacher, findTeacherRes] = useTeachersFindMinMutation()
    const [findLesson, findLessonRes] = useLessonsFindMutation()
    const [updateSchedule, updateScheduleRes] = useScheduleUpdateMutation()

    // Вспомогательные состояния
    const [hasGroupSecond, setHasGroupSecond] = useState(false)

    const queryFind = useScheduleFindIdQuery({
        token: user.token,
        id: scheduleID,
    })
    // Обработчики
    const handleUpdateSchedule = () => {
        updateSchedule({
            token: user.token,
            id: scheduleID,
            room_first: roomFirst,
            lesson_name: lesson,
            teachers_fullname_first: teacherFirst,
            room_second: roomSecond,
            teachers_fullname_second: teacherSecond,
        })
        refetch()
        closeWindow()
    }
    const handleCancelSecondGroup = () => {
        setTeacherSecond("")
        setRoomSecond("")
        setHasGroupSecond(false)
    }
    const findingTeachers = (fullname: string) => {
        findTeacher({
            token: user.token,
            fullname: fullname,
        })
    }
    const findingLessons = (lesson: string) => {
        findLesson({
            token: user.token,
            name: lesson,
        })
    }

    useEffect(() => {
        if (
            [teacherFirst, roomFirst, lesson].every(
                (value) => value.trim() !== ''
            )
        ) {
            setCanSend(true)
        } else {
            setCanSend(false)
        }
    }, [teacherFirst, roomFirst, lesson])

    useEffect(() => {
        let data = queryFind.data?.[0]
        if (!data) {
            return;
        }
        setTeacherFirst(data.teacher_first)
        setRoomFirst(data.room_first)
        setLesson(data.name)

        if (data.room_second && data.teacher_second) {
            setHasGroupSecond(true)
            setRoomSecond(data.room_second)
            setTeacherSecond(data.teacher_second)
        }
    }, [queryFind])

    if (queryFind.isError)
        return (
            <p style={{ color: 'red', textAlign: 'center' }}>
                Ошибка получения данных о преподавателе
            </p>
        )

    if (queryFind.isLoading)
        return (
            <p style={{ color: 'gray', textAlign: 'center' }}>
                Загрузка данных
            </p>
        )

    if (queryFind.isSuccess) {
        return (
            <div className={st.form}>
                {updateScheduleRes.data}
                <InputDelay
                    name="lesson"
                    list="lessons"
                    type="text"
                    inputing={setLesson}
                    callback={findingLessons}
                    value={lesson}
                    placeholder="Дисциплина"
                />
                <datalist id="lessons">
                    {findLessonRes.data?.map((lesson) => (
                        <option key={lesson.name} value={lesson.name} />
                    ))}
                </datalist>
                <div className={st.form_group}>
                    <Input
                        name="roomFirst"
                        value={roomFirst}
                        onChange={(event) => setRoomFirst(event.target.value)}
                        placeholder="Аудитория"
                    />
                    <InputDelay
                        name="teacherFirst"
                        list="teachersFirst"
                        type="text"
                        callback={findingTeachers}
                        inputing={setTeacherFirst}
                        value={teacherFirst}
                        placeholder="Преподаватель"
                    />
                    <datalist id="teachersFirst">
                        {findTeacherRes.data?.map((teacher) => (
                            <option
                                key={teacher.fullname}
                                value={teacher.fullname}
                            >
                                {teacher.fullname}
                            </option>
                        ))}
                    </datalist>
                </div>
                {!hasGroupSecond ? (
                    <Button
                        onClick={() =>
                            setHasGroupSecond((oldState) => !oldState)
                        }
                    >
                        <span>Добавить подгруппу</span>
                    </Button>
                ) : (
                    <div className={st.form_group}>
                        <Input
                            name="roomSecond"
                            value={roomSecond}
                            onChange={(event) =>
                                setRoomSecond(event.target.value)
                            }
                            placeholder="Аудитория"
                        />
                        <InputDelay
                            name="teacherSecond"
                            list="teachersSecond"
                            type="text"
                            callback={findingTeachers}
                            inputing={setTeacherSecond}
                            value={teacherSecond}
                            placeholder="Преподаватель"
                        />
                        <Button onClick={handleCancelSecondGroup}>
                            <span>Убрать</span>
                        </Button>
                        <datalist id="teachersSecond">
                            {findTeacherRes.data?.map((teacher) => (
                                <option
                                    key={teacher.fullname}
                                    value={teacher.fullname}
                                />
                            ))}
                        </datalist>
                    </div>
                )}
                <Button onClick={handleUpdateSchedule} disabled={!canSend}>
                    <span>Отправить</span>
                </Button>
            </div>
        )
    }
}
