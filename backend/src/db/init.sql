-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 27 2024 г., 16:42
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

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

-- --------------------------------------------------------

--
-- Структура таблицы `lessons`
--

CREATE TABLE `lessons` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
(15, 'Иванов Иван иванович', '9001112233', 'ontalex@yandex.ru');

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
(1, 'staff', '$2a$05$EXnxx0E18z7SanoDdsOI3ee.AvaFun5O7yYr.hI0QH9I9SKi9YRjq', 'omn/@(k}VSC2Ll*ryO1GROUvDFnNa$qd,*Ka', NULL, 15, 2, 1);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `logbook`
--
ALTER TABLE `logbook`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT для таблицы `students`
--
ALTER TABLE `students`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT для таблицы `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
