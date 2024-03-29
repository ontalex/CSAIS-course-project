-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 29 2024 г., 13:05
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `csais_v3`
--

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE `groups` (
  `id` int NOT NULL,
  `name` varchar(10) NOT NULL,
  `date_create` date NOT NULL,
  `date_end` date NOT NULL,
  `tutor_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `groups`
--

INSERT INTO `groups` (`id`, `name`, `date_create`, `date_end`, `tutor_id`) VALUES
(1, 'ИСП-404', '2020-01-01', '2025-01-01', 1),
(2, 'ИСП-403', '2020-01-01', '2025-01-01', 2),
(3, 'ИСП-402', '2020-01-01', '2025-01-01', 3),
(4, 'ИСП-401', '2020-01-01', '2025-01-01', 4);

-- --------------------------------------------------------

--
-- Структура таблицы `lessons`
--

CREATE TABLE `lessons` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `lessons`
--

INSERT INTO `lessons` (`id`, `name`) VALUES
(1, 'Lesson 1'),
(2, 'Lesson 3'),
(3, 'Lesson 4'),
(4, 'Lesson 5'),
(5, 'Lesson 6'),
(6, 'lesson 7');

-- --------------------------------------------------------

--
-- Структура таблицы `logbook`
--

CREATE TABLE `logbook` (
  `id` int NOT NULL,
  `type_log` varchar(2) NOT NULL,
  `date_update` datetime NOT NULL,
  `schedule_id` int NOT NULL,
  `students_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'older'),
(2, 'staff'),
(3, 'tutor');

-- --------------------------------------------------------

--
-- Структура таблицы `schedule`
--

CREATE TABLE `schedule` (
  `id` int NOT NULL,
  `group_id` int NOT NULL,
  `room_first` varchar(10) NOT NULL,
  `room_second` varchar(10) DEFAULT NULL,
  `number_lesson` int NOT NULL,
  `lessons_id` int NOT NULL,
  `teachers_id_first` int NOT NULL,
  `teachers_id_second` int DEFAULT NULL,
  `date_lesson` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `schedule`
--

INSERT INTO `schedule` (`id`, `group_id`, `room_first`, `room_second`, `number_lesson`, `lessons_id`, `teachers_id_first`, `teachers_id_second`, `date_lesson`) VALUES
(1, 0, '210', NULL, 1, 0, 0, NULL, '2024-03-20'),
(2, 1, '212', '312', 1, 2, 1, 5, '2024-03-20'),
(3, 1, '213', '313', 1, 3, 3, 3, '2024-03-20'),
(4, 2, '214', '314', 1, 4, 4, 0, '2024-03-20'),
(5, 2, '215', '315', 1, 5, 5, 5, '2024-03-20'),
(6, 3, '216', NULL, 1, 6, 6, NULL, '2024-03-20'),
(7, 0, '210', NULL, 2, 0, 0, NULL, '2024-03-21'),
(8, 1, '212', NULL, 2, 2, 1, NULL, '2024-03-21'),
(9, 1, '213', NULL, 2, 3, 3, NULL, '2024-03-21'),
(10, 2, '214', NULL, 2, 4, 4, NULL, '2024-03-21'),
(11, 2, '215', NULL, 2, 5, 5, NULL, '2024-03-21'),
(12, 3, '216', NULL, 2, 6, 6, NULL, '2024-03-22'),
(13, 0, '210', NULL, 3, 0, 0, NULL, '2024-03-22'),
(14, 1, '212', NULL, 3, 2, 1, NULL, '2024-03-22'),
(15, 1, '213', NULL, 3, 3, 3, NULL, '2024-03-22'),
(16, 2, '214', NULL, 3, 4, 4, NULL, '2024-03-22'),
(17, 2, '215', NULL, 3, 5, 5, NULL, '2024-03-22'),
(18, 3, '216', NULL, 3, 6, 6, NULL, '2024-03-23'),
(19, 0, '210', NULL, 4, 0, 0, NULL, '2024-03-23'),
(20, 1, '212', NULL, 4, 2, 1, NULL, '2024-03-23'),
(21, 1, '213', NULL, 4, 3, 3, NULL, '2024-03-23'),
(22, 2, '214', NULL, 4, 4, 4, NULL, '2024-03-23'),
(23, 2, '215', NULL, 4, 5, 5, NULL, '2024-03-23'),
(24, 3, '216', NULL, 4, 6, 6, NULL, '2024-03-23');

-- --------------------------------------------------------

--
-- Структура таблицы `students`
--

CREATE TABLE `students` (
  `id` int NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `group_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `students`
--

INSERT INTO `students` (`id`, `fullname`, `phone`, `email`, `group_id`) VALUES
(1, 'Student 10', '9169100000', 'example10student@ya.ru', 0),
(2, 'Student 11', '9169110000', 'example11student@ya.ru', 1),
(3, 'Student 12', '9169120000', 'example12student@ya.ru', 2),
(4, 'Student 13', '9169130000', 'example13student@ya.ru', 3),
(5, 'Student 14', '9169140000', 'example14student@ya.ru', 0),
(6, 'Student 15', '9169150000', 'example15student@ya.ru', 1),
(7, 'Student 16', '9169160000', 'example16student@ya.ru', 2),
(8, 'Student 17', '9169170000', 'example17student@ya.ru', 3),
(9, 'Student 18', '9169180000', 'example18student@ya.ru', 0),
(10, 'Student 19', '9169190000', 'example19student@ya.ru', 1),
(11, 'Student 20', '9169200000', 'example20student@ya.ru', 2),
(12, 'Student 21', '9169210000', 'example21student@ya.ru', 3),
(13, 'Student 22', '9169220000', 'example22student@ya.ru', 0),
(14, 'Student 23', '9169230000', 'example23student@ya.ru', 1),
(15, 'Student 24', '9169240000', 'example24student@ya.ru', 2),
(16, 'Student 25', '9169250000', 'example25student@ya.ru', 3),
(17, 'Student 26', '9169260000', 'example26student@ya.ru', 0),
(18, 'Student 27', '9169270000', 'example27student@ya.ru', 1),
(19, 'Student 28', '9169280000', 'example28student@ya.ru', 2),
(20, 'Student 29', '9169290000', 'example29student@ya.ru', 3),
(21, 'Student 30', '9169300000', 'example30student@ya.ru', 0),
(22, 'Student 31', '9169310000', 'example31student@ya.ru', 1),
(23, 'Student 32', '9169320000', 'example32student@ya.ru', 2),
(24, 'Student 33', '9169330000', 'example33student@ya.ru', 3),
(25, 'Student 34', '9169340000', 'example34student@ya.ru', 0),
(26, 'Student 35', '9169350000', 'example35student@ya.ru', 1),
(27, 'Student 36', '9169360000', 'example36student@ya.ru', 2),
(28, 'Student 37', '9169370000', 'example37student@ya.ru', 3),
(29, 'Student 38', '9169380000', 'example38student@ya.ru', 0),
(30, 'Student 39', '9169390000', 'example39student@ya.ru', 1),
(31, 'Student 40', '9169400000', 'example40student@ya.ru', 2),
(32, 'Student 41', '9169410000', 'example41student@ya.ru', 3),
(33, 'Student 42', '9169420000', 'example42student@ya.ru', 0),
(34, 'Student 43', '9169430000', 'example43student@ya.ru', 1),
(35, 'Student 44', '9169440000', 'example44student@ya.ru', 2),
(36, 'Student 45', '9169450000', 'example45student@ya.ru', 3),
(37, 'Student 46', '9169460000', 'example46student@ya.ru', 0),
(38, 'Student 47', '9169470000', 'example47student@ya.ru', 1),
(39, 'Student 48', '9169480000', 'example48student@ya.ru', 2),
(40, 'Student 49', '9169490000', 'example49student@ya.ru', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `teachers`
--

CREATE TABLE `teachers` (
  `id` int NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `teachers`
--

INSERT INTO `teachers` (`id`, `fullname`, `phone`, `email`) VALUES
(1, 'Препадователь 02', '9169475048', 'examle02teacher@ya.ru'),
(2, 'Препадователь 01', '9151009988', 'examle01teacher@ya.ru'),
(3, 'Препадователь 04', '9154009988', 'examle04teacher@ya.ru'),
(4, 'Препадователь 05', '9155009988', 'examle05teacher@ya.ru'),
(5, 'Препадователь 06', '9156009988', 'examle06teacher@ya.ru'),
(6, 'Препадователь 07', '9123428899', 'examle07teacher@ya.ru');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `login` varchar(100) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `secret_key` varchar(45) NOT NULL,
  `students_id` int DEFAULT NULL,
  `teachers_id` int DEFAULT NULL,
  `roles_id` int NOT NULL,
  `isactive` tinyint NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `secret_key`, `students_id`, `teachers_id`, `roles_id`, `isactive`) VALUES
(1, 'staff', '$2a$05$H4RemKqzgGK5cygjZjs34.0Ww/3IHXj89IWDUW9oY/UI9Cc.Q1Fni', 'omn/@(k}VSC2Ll*ryO1GROUvDFnNa$qd,*Ka', NULL, NULL, 2, 1),
(2, 'tutor', '$2a$05$utJmYWmzVw9b6ZG9T/I37.h8YvAFRNA3EQ2pHeGjRRj91fDWZitzG', '72bW.tn5*,d9]WzN$6xJr+v%#kb4qgTf9wI#', NULL, 2, 3, 1),
(3, 'older', '$2a$05$j8qmyAnZxxxKTmlHfPWXDOim7826mTcv89ZQn/Ql6SGLeEJMcS9r6', 'DtCjY2kvUa}1+C90NnD!n!Et!#*qpITT5Wn+', 1, NULL, 1, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`),
  ADD KEY `fk_grops_teachers1_idx` (`tutor_id`);

--
-- Индексы таблицы `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Индексы таблицы `logbook`
--
ALTER TABLE `logbook`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_logbook_schedule1_idx` (`schedule_id`),
  ADD KEY `fk_logbook_students1_idx` (`students_id`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Индексы таблицы `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_schedule_lessons_idx` (`lessons_id`),
  ADD KEY `fk_schedule_teachers1_idx` (`teachers_id_first`),
  ADD KEY `fk_schedule_teachers2_idx` (`teachers_id_second`),
  ADD KEY `fk_shedule_groups` (`group_id`);

--
-- Индексы таблицы `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD KEY `fk_students_grops1_idx` (`group_id`);

--
-- Индексы таблицы `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone_UNIQUE` (`phone`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login_UNIQUE` (`login`),
  ADD KEY `fk_users_students1_idx` (`students_id`),
  ADD KEY `fk_users_teachers1_idx` (`teachers_id`),
  ADD KEY `fk_users_roles1_idx` (`roles_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `logbook`
--
ALTER TABLE `logbook`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `students`
--
ALTER TABLE `students`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT для таблицы `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `fk_grops_teachers1` FOREIGN KEY (`tutor_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `logbook`
--
ALTER TABLE `logbook`
  ADD CONSTRAINT `fk_logbook_schedule1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_logbook_students1` FOREIGN KEY (`students_id`) REFERENCES `students` (`id`);

--
-- Ограничения внешнего ключа таблицы `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `fk_schedule_lessons` FOREIGN KEY (`lessons_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_schedule_teachers1` FOREIGN KEY (`teachers_id_first`) REFERENCES `teachers` (`id`),
  ADD CONSTRAINT `fk_schedule_teachers2` FOREIGN KEY (`teachers_id_second`) REFERENCES `teachers` (`id`),
  ADD CONSTRAINT `fk_shedule_groups` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `fk_students_grops1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_students1` FOREIGN KEY (`students_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `fk_users_teachers1` FOREIGN KEY (`teachers_id`) REFERENCES `teachers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
