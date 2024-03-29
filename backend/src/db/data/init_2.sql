INSERT INTO `teachers` (`fullname`, `phone`, `email`) VALUES
('Препадователь 02', '9169475048', 'examle02teacher@ya.ru'),
('Препадователь 01', '9151009988', 'examle01teacher@ya.ru'),
('Препадователь 04', '9154009988', 'examle04teacher@ya.ru'),
('Препадователь 05', '9155009988', 'examle05teacher@ya.ru'),
('Препадователь 06', '9156009988', 'examle06teacher@ya.ru'),
('Препадователь 07', '9123428899', 'examle07teacher@ya.ru');

INSERT INTO `groups` (`name`, `date_create`, `date_end`, `tutor_id`) VALUES
('ИСП-404', '2020-01-01', '2025-01-01', 1),
('ИСП-403', '2020-01-01', '2025-01-01', 2),
('ИСП-402', '2020-01-01', '2025-01-01', 3),
('ИСП-401', '2020-01-01', '2025-01-01', 4);

INSERT INTO `lessons` (`name`) VALUES
('Lesson 1'),
('Lesson 3'),
('Lesson 4'),
('Lesson 5'),
('Lesson 6'),
('lesson 7');

INSERT INTO `schedule` ( `group_id`, `lessons_id`, `number_lesson`, `date_lesson`, `room_first`, `room_second`, `teachers_id_first`, `teachers_id_second` ) VALUES 
(0, 0, 1, '2024-03-20', '210', NULL, 0, NULL),
(1, 2, 1, '2024-03-20', '212', '312', 1, 5),
(1, 3, 1, '2024-03-20', '213', '313', 3, 3),
(2, 4, 1, '2024-03-20', '214', '314', 4, 0),
(2, 5, 1, '2024-03-20', '215', '315', 5, 5),
(3, 6, 1, '2024-03-20', '216', NULL, 6, NULL),
(0, 0, 2, '2024-03-21', '210', NULL, 0, NULL),
(1, 2, 2, '2024-03-21', '212', NULL, 1, NULL),
(1, 3, 2, '2024-03-21', '213', NULL, 3, NULL),
(2, 4, 2, '2024-03-21', '214', NULL, 4, NULL),
(2, 5, 2, '2024-03-21', '215', NULL, 5, NULL),
(3, 6, 2, '2024-03-22', '216', NULL, 6, NULL),
(0, 0, 3, '2024-03-22', '210', NULL, 0, NULL),
(1, 2, 3, '2024-03-22', '212', NULL, 1, NULL),
(1, 3, 3, '2024-03-22', '213', NULL, 3, NULL),
(2, 4, 3, '2024-03-22', '214', NULL, 4, NULL),
(2, 5, 3, '2024-03-22', '215', NULL, 5, NULL),
(3, 6, 3, '2024-03-23', '216', NULL, 6, NULL),
(0, 0, 4, '2024-03-23', '210', NULL, 0, NULL),
(1, 2, 4, '2024-03-23', '212', NULL, 1, NULL),
(1, 3, 4, '2024-03-23', '213', NULL, 3, NULL),
(2, 4, 4, '2024-03-23', '214', NULL, 4, NULL),
(2, 5, 4, '2024-03-23', '215', NULL, 5, NULL),
(3, 6, 4, '2024-03-23', '216', NULL, 6, NULL);

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'older'),
(2, 'staff'),
(0, 'tutor');

INSERT INTO `students` (`fullname`, `phone`, `email`, `group_id`) VALUES
('Student 10', '9169100000', 'example10student@ya.ru', 0),
('Student 11', '9169110000', 'example11student@ya.ru', 1),
('Student 12', '9169120000', 'example12student@ya.ru', 2),
('Student 13', '9169130000', 'example13student@ya.ru', 3),
('Student 14', '9169140000', 'example14student@ya.ru', 0),
('Student 15', '9169150000', 'example15student@ya.ru', 1),
('Student 16', '9169160000', 'example16student@ya.ru', 2),
('Student 17', '9169170000', 'example17student@ya.ru', 3),
('Student 18', '9169180000', 'example18student@ya.ru', 0),
('Student 19', '9169190000', 'example19student@ya.ru', 1),
('Student 20', '9169200000', 'example20student@ya.ru', 2),
('Student 21', '9169210000', 'example21student@ya.ru', 3),
('Student 22', '9169220000', 'example22student@ya.ru', 0),
('Student 23', '9169230000', 'example23student@ya.ru', 1),
('Student 24', '9169240000', 'example24student@ya.ru', 2),
('Student 25', '9169250000', 'example25student@ya.ru', 3),
('Student 26', '9169260000', 'example26student@ya.ru', 0),
('Student 27', '9169270000', 'example27student@ya.ru', 1),
('Student 28', '9169280000', 'example28student@ya.ru', 2),
('Student 29', '9169290000', 'example29student@ya.ru', 3),
('Student 30', '9169300000', 'example30student@ya.ru', 0),
('Student 31', '9169310000', 'example31student@ya.ru', 1),
('Student 32', '9169320000', 'example32student@ya.ru', 2),
('Student 33', '9169330000', 'example33student@ya.ru', 3),
('Student 34', '9169340000', 'example34student@ya.ru', 0),
('Student 35', '9169350000', 'example35student@ya.ru', 1),
('Student 36', '9169360000', 'example36student@ya.ru', 2),
('Student 37', '9169370000', 'example37student@ya.ru', 3),
('Student 38', '9169380000', 'example38student@ya.ru', 0),
('Student 39', '9169390000', 'example39student@ya.ru', 1),
('Student 40', '9169400000', 'example40student@ya.ru', 2),
('Student 41', '9169410000', 'example41student@ya.ru', 3),
('Student 42', '9169420000', 'example42student@ya.ru', 0),
('Student 43', '9169430000', 'example43student@ya.ru', 1),
('Student 44', '9169440000', 'example44student@ya.ru', 2),
('Student 45', '9169450000', 'example45student@ya.ru', 3),
('Student 46', '9169460000', 'example46student@ya.ru', 0),
('Student 47', '9169470000', 'example47student@ya.ru', 1),
('Student 48', '9169480000', 'example48student@ya.ru', 2),
('Student 49', '9169490000', 'example49student@ya.ru', 3);

INSERT INTO `users` (`login`, `password`, `secret_key`, `students_id`, `teachers_id`, `roles_id`, `isactive`) VALUES
('staff', '$2a$05$H4RemKqzgGK5cygjZjs34.0Ww/3IHXj89IWDUW9oY/UI9Cc.Q1Fni', 'omn/@(k}VSC2Ll*ryO1GROUvDFnNa$qd,*Ka', NULL, NULL, 2, 1),
('tutor', '$2a$05$utJmYWmzVw9b6ZG9T/I37.h8YvAFRNA3EQ2pHeGjRRj91fDWZitzG', '72bW.tn5*,d9]WzN$6xJr+v%#kb4qgTf9wI#', NULL, 0, 0, 1),
('older', '$2a$05$j8qmyAnZxxxKTmlHfPWXDOim7826mTcv89ZQn/Ql6SGLeEJMcS9r6', 'DtCjY2kvUa}1+C90NnD!n!Et!#*qpITT5Wn+', NULL, 0, 1, 1);