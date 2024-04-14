import { useState } from 'react'
import InputDelay from '../../InputDelay'
import Input from '../../Input'
import {
    useLessonsFindMutation,
    useScheduleAddMutation,
    useTeachersFindMinMutation,
} from '../../../store/csais/csais.api'
import { useAuth } from '../../../hooks/useAuth'
import Button from '../../Button'
import { store } from '../../../store'

import st from './style.module.css'
import { IAuthContext } from '../../../types/authContext.type'

interface IGroupSchedule {
    closeWindow: () => void
    refetch: () => void
    dateLesson: string
    lessonNumber: string | number
}

export default function GroupSchedule({
    closeWindow,
    refetch,
    dateLesson,
    lessonNumber,
}: IGroupSchedule) {
    const { user } = useAuth()

    // Данные для отправки
    const [teacherFirst, setTeacherFirst] = useState<string>('')
    const [teacherSecond, setTeacherSecond] = useState<string | undefined>()
    const [roomFirst, setRoomFirst] = useState<string>('')
    const [roomSecond, setRoomSecond] = useState<string | undefined>()
    const [lesson, setLesson] = useState<string>('')

    const [canSend, setCanSend] = useState<boolean>(false)

    // API запросы
    const [findTeacher, findTeacherRes] = useTeachersFindMinMutation()
    const [findLesson, findLessonRes] = useLessonsFindMutation()
    const [addSchedule, addScheduleRes] = useScheduleAddMutation()

    // Вспомогательные состояния
    const [hasGroupSecond, setHasGroupSecond] = useState(false)

    // Обработчики
    const handleAddSchedule = () => {
        addSchedule({
            group_id: store.getState().group.groupID,
            token: user.token,
            date_lesson: dateLesson,
            room_first: roomFirst,
            number_lesson: lessonNumber,
            lesson_name: lesson,
            teachers_fullname_first: teacherFirst,
            room_second: roomSecond,
            teachers_fullname_second: teacherSecond,
        })
        refetch()
        closeWindow()
    }
    const handleCancelSecondGroup = () => {
        setTeacherSecond(undefined)
        setRoomSecond(undefined)
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

    return (
        <div className={st.form}>
            {addScheduleRes.data}
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
                        <option key={teacher.fullname} value={teacher.fullname}>
                            {teacher.fullname}
                        </option>
                    ))}
                </datalist>
            </div>
            {!hasGroupSecond ? (
                <Button
                    onClick={() => setHasGroupSecond((oldState) => !oldState)}
                >
                    <span>Добавить подгруппу</span>
                </Button>
            ) : (
                <div className={st.form_group}>
                    <Input
                        name="roomSecond"
                        onChange={(event) => setRoomSecond(event.target.value)}
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
            <Button onClick={handleAddSchedule} disabled={!canSend}>
                <span>Отправить</span>
            </Button>
        </div>
    )
}
