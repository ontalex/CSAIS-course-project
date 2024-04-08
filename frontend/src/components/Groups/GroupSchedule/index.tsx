import { useState } from 'react'
import InputDelay from '../../InputDelay'
import Input from '../../Input'
import {
    useLessonsFindMutation,
    useScheduleAddMutation,
    useTeachersFindMutation,
} from '../../../store/csais/csais.api'
import { every } from 'lodash'
import { useAuth } from '../../../hooks/useAuth'
import Button from '../../Button'
import { store } from '../../../store'

export default function GroupSchedule({
    closeWindow,
    refetch,
    dateLesson,
    lessonNumber,
}) {
    const { user } = useAuth()

    // Данные для отправки
    const [teacherFirst, setTeacherFirst] = useState<string>('')
    const [teacherSecond, setTeacherSecond] = useState<string | undefined>()
    const [roomFirst, setRoomFirst] = useState<string>('')
    const [roomSecond, setRoomSecond] = useState<string | undefined>()
    const [lesson, setLesson] = useState<string>('')

    // API запросы
    const [findTeacher, findTeacherRes] = useTeachersFindMutation()
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
        closeWindow()
        refetch()
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
        <div>
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
            <div>
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
                <div>
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
            <Button onClick={handleAddSchedule}>
                <span>Отправить</span>
            </Button>
        </div>
    )
}
