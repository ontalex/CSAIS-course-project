import { db_pool } from "../../helpers/database.js";
import validators from "../../helpers/validators.js";
// import data_generation from "../../helpers/data_generation.js";
import helpers from "../../helpers/helpers.js";

class ReportsControllers {

    // get_percent_logs_by_week = async (req, res) => {
    //     if (validators.everyFiled(["group_id", "day"], req.query)) {
    //         return res.status(400).json({
    //             name: "None felids",
    //             message: "Some felid not send"
    //         })
    //     }
    //     let week = helpers.getMondayAndSunday(req.query.day);
    //     console.log("WEEK: ", week);

    //     let sqlCountLogs = 'select students.fullname, count(logbook.type_log) as count_logs from logbook RIGHT JOIN students on logbook.students_id = students.id JOIN `schedule` ON logbook.schedule_id = `schedule`.`id` WHERE students.group_id = ? AND `schedule`.`date_lesson` BETWEEN ? AND ? GROUP BY students.fullname ORDER BY students.fullname;';
    //     let sqlCountSchedule = 'select count(*) as count from `schedule` WHERE ( `schedule`.`date_lesson` BETWEEN ? AND ? ) and `schedule`.`group_id` = ?;';
    //     let valuesCountLogs = [req.query.group_id, week.monday, week.sunday]
    //     let valuesCountSchedule = [week.monday, week.sunday, req.query.group_id]
    //     try {

    //         let [dataLogs, fieldsLogs] = await db_pool.promise().query(sqlCountLogs, valuesCountLogs);
    //         let [dataSchedule, fieldsSchedule] = await db_pool.promise().query(sqlCountSchedule, valuesCountSchedule);

    //         if (dataLogs.length == 0) {
    //             return res.json({
    //                 percent: 100
    //             })
    //         }

    //         let studentsNotHave = dataLogs.map((item) => 1 - (item.count_logs / dataSchedule[0].count));
    //         let sumCount = studentsNotHave.reduce((sum, item) => sum + item, 0);
    //         let percent = (sumCount / studentsNotHave.length) * 100

    //         return res.json({
    //             percent: Math.floor(percent)
    //         })

    //     } catch (error) {

    //         res.status(500).json({
    //             err: error.name
    //         })

    //     }

    // }

    get_report_max = async (req, res) => {
        if (validators.everyFiled(["group_id", "day_start", "day_end", "type"], req.query)) {
            return res.status(400).json({
                name: "None felids",
                message: "Some felid not send"
            })
        }

        try {
            console.log(`get order (start: ${req.query.day_start} -- end: ${req.query.day_end})`);

            console.table(req.query);
            console.table(req.user);

            const [rows_schedule] = await db_pool.promise().query(`SELECT lessons.id AS lesson_id, schedule.date_lesson AS lesson_date, schedule.number_lesson AS lesson_number, lessons.name AS lesson_name FROM schedule INNER JOIN lessons ON schedule.lessons_id = lessons.id WHERE (schedule.date_lesson BETWEEN ? AND ?) AND schedule.group_id = ? ORDER BY schedule.date_lesson, schedule.number_lesson;
            `, [req.query.day_start, req.query.day_end, req.query.group_id]);

            const [students] = await db_pool.promise().query(`SELECT students.id, students.fullname FROM students WHERE students.group_id = ? ORDER BY students.fullname;`, [req.query.group_id]);

            const getLogs = async (student, start, end) => {
                let [data] = await db_pool.promise().query(`SELECT oneStudent.type_log FROM schedule LEFT OUTER JOIN ( SELECT * FROM logbook WHERE logbook.students_id = ? ) as oneStudent ON schedule.id = oneStudent.schedule_id WHERE ( schedule.date_lesson BETWEEN ? AND ? ) AND schedule.group_id = ? ORDER BY schedule.date_lesson, schedule.number_lesson;`, [student, start, end, req.query.group_id]);
                return data;
            };

            const [tutorData] = await db_pool.promise().query("SELECT `csais_v3`.`teachers`.`fullname` FROM `csais_v3`.`groups` JOIN `csais_v3`.`teachers` ON `csais_v3`.`groups`.`tutor_id` = `csais_v3`.`teachers`.`id` WHERE `csais_v3`.`groups`.id = ?;", [req.query.group_id])

            const [groupData] = await db_pool.promise().query("select `name` from `groups` where `groups`.`id` = ?;", [req.query.group_id])

            const editorData = {
                name: ""
            }

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

                        console.group('line 102');
                        console.table(element);
                        console.groupEnd();

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
                        // logs: arrayLogs,
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