import { useState } from 'react'
import InputDelay from '../../InputDelay'
import Input from '../../Input'
import {
    useLessonsFindMutation,
    useTeachersFindMutation,
} from '../../../store/csais/csais.api'
import { every } from 'lodash'
import { useAuth } from '../../../hooks/useAuth'

export default function GroupSchedule({ closeWindow, refetch }) {
    const { user } = useAuth()

    const [teacher, setTeacher] = useState('')
    const [lesson, setLesson] = useState('')
    const [room, setRoom] = useState('')

    const [findTeacher, findTeacherRes] = useTeachersFindMutation()
    const [findLesson, findLessonRes] = useLessonsFindMutation()

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
            />
            <datalist id="lessons">
                {findTeacherRes.data?.map((teacher) => (
                    <option key={teacher.fullname} value={teacher.fullname}>
                        {teacher.fullname}
                    </option>
                ))}
            </datalist>
            <Input
                name="room"
                onChange={(event) => setRoom(event.target.value)}
            />
            <InputDelay
                name="teacher"
                list="teachers"
                type="text"
                callback={findingTeachers}
                inputing={setTeacher}
                value={teacher}
            />
            <datalist list="teachers">
                {findTeacherRes.data?.map((teacher) => (
                    <option key={teacher.fullname} value={teacher.fullname}>
                        {teacher.fullname}
                    </option>
                ))}
            </datalist>
        </div>
    )
}
