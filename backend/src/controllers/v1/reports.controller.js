import { db_pool } from "../../helpers/database.js";
import validators from "../../helpers/validators.js";
// import data_generation from "../../helpers/data_generation.js";
import helpers from "../../helpers/helpers.js";

class ReportsControllers {
    get_report_max = async (req, res) => {
        if (validators.everyFiled(["group_id", "day_start", "day_end", "type"], req.query)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }
        try {
            const [rows_schedule] = await db_pool.promise().query(`SELECT lessons.id AS lesson_id, schedule.date_lesson AS lesson_date, schedule.number_lesson AS lesson_number, lessons.name AS lesson_name FROM schedule INNER JOIN lessons ON schedule.lessons_id = lessons.id WHERE (schedule.date_lesson BETWEEN ? AND ?) AND schedule.group_id = ? ORDER BY schedule.date_lesson, schedule.number_lesson;`, [req.query.day_start, req.query.day_end, req.query.group_id]);
            const [students] = await db_pool.promise().query(`SELECT students.id, students.fullname FROM students WHERE students.group_id = ? ORDER BY students.fullname;`, [req.query.group_id]);
            const getLogs = async (student, start, end) => {
                let [data] = await db_pool.promise().query(`SELECT oneStudent.type_log FROM schedule LEFT OUTER JOIN ( SELECT * FROM logbook WHERE logbook.students_id = ? ) as oneStudent ON schedule.id = oneStudent.schedule_id WHERE ( schedule.date_lesson BETWEEN ? AND ? ) AND schedule.group_id = ? ORDER BY schedule.date_lesson, schedule.number_lesson;`, [student, start, end, req.query.group_id]);
                return data;
            };
            const [tutorData] = await db_pool.promise().query("SELECT `csais_v3`.`teachers`.`fullname` FROM `csais_v3`.`groups` JOIN `csais_v3`.`teachers` ON `csais_v3`.`groups`.`tutor_id` = `csais_v3`.`teachers`.`id` WHERE `csais_v3`.`groups`.id = ?;", [req.query.group_id])
            const [groupData] = await db_pool.promise().query("select `name` from `groups` where `groups`.`id` = ?;", [req.query.group_id])
            const editorData = { name: "" }
            if (req.user.role == "tutor") {
                editorData.name = tutorData[0].fullname
            } else if (req.user.role == "older") {
                const [olderData] = await db_pool.promise().query("select `fullname` from `users` JOIN `students` ON `users`.`students_id` = `students`.`id` WHERE `users`.`id` = ?;", [req.user.user_id])
                console.log(olderData);
                editorData.name = olderData[0].fullname
            } else {
                editorData.name = null
            }
            const answer = {
                date_start: req.query.day_start.toString(),
                date_end: req.query.day_end.toString(),
                group_name: groupData[0].name,
                tutor: tutorData[0].fullname,
                editor: editorData.name,
                lessons: req.query.type == "max" ? rows_schedule : [],
                students: await Promise.all(students.map(async (item) => {
                    let logs = await getLogs(item.id, req.query.day_start, req.query.day_end);
                    let arrayLogs = logs.reduce((accum, item) => {
                        accum = [...accum, item.type_log || ""];
                        return accum
                    }, []);
                    let objTotal = {
                        disease: 0,
                        respectfully: 0,
                        disrespectful: 0,
                        delays: 0
                    }
                    arrayLogs.forEach(element => {
                        switch (element) {
                            case "н":
                                objTotal = { ...objTotal, disrespectful: objTotal.disrespectful + 2 };
                                break;
                            case "б":
                                objTotal = { ...objTotal, disease: objTotal.disease + 2 };
                                break;
                            case "у":
                                objTotal = { ...objTotal, respectfully: objTotal.respectfully + 2 };
                                break;
                            case "о":
                                objTotal = { ...objTotal, delays: objTotal.delays + 1 };
                                break;
                        }
                    });
                    return {
                        student_id: item.id_student,
                        student_fullname: item.fullname,
                        logs: req.query.type == "max" ? arrayLogs : [],
                        total: objTotal
                    };
                }))
            };
            res.json(answer);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Some error with DB!" });
        }
    }

}

export default new ReportsControllers();