-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema csais_v2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema csais_v2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `csais_v2` DEFAULT CHARACTER SET utf8 ;
USE `csais_v2` ;

-- -----------------------------------------------------
-- Table `csais_v2`.`lessons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csais_v2`.`lessons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csais_v2`.`teachers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csais_v2`.`teachers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csais_v2`.`schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csais_v2`.`schedule` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `room_first` VARCHAR(10) NOT NULL,
  `room_second` VARCHAR(10) NULL,
  `number_lesson` INT NOT NULL,
  `lessons_id` INT NOT NULL,
  `teachers_id_first` INT NOT NULL,
  `teachers_id_second` INT NULL,
  `date_lesson` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_schedule_lessons_idx` (`lessons_id` ASC) VISIBLE,
  INDEX `fk_schedule_teachers1_idx` (`teachers_id_first` ASC) VISIBLE,
  INDEX `fk_schedule_teachers2_idx` (`teachers_id_second` ASC) VISIBLE,
  CONSTRAINT `fk_schedule_lessons`
    FOREIGN KEY (`lessons_id`)
    REFERENCES `csais_v2`.`lessons` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_schedule_teachers1`
    FOREIGN KEY (`teachers_id_first`)
    REFERENCES `csais_v2`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_schedule_teachers2`
    FOREIGN KEY (`teachers_id_second`)
    REFERENCES `csais_v2`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csais_v2`.`groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csais_v2`.`groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(10) NOT NULL,
  `date_create` DATE NOT NULL,
  `date_end` DATE NOT NULL,
  `tutor_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `fk_grops_teachers1_idx` (`tutor_id` ASC) VISIBLE,
  CONSTRAINT `fk_grops_teachers1`
    FOREIGN KEY (`tutor_id`)
    REFERENCES `csais_v2`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csais_v2`.`students`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csais_v2`.`students` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `group_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_students_grops1_idx` (`group_id` ASC) VISIBLE,
  CONSTRAINT `fk_students_grops1`
    FOREIGN KEY (`group_id`)
    REFERENCES `csais_v2`.`groups` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csais_v2`.`logbook`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csais_v2`.`logbook` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type_log` VARCHAR(2) NOT NULL,
  `date_update` DATETIME NOT NULL,
  `schedule_id` INT NOT NULL,
  `students_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_logbook_schedule1_idx` (`schedule_id` ASC) VISIBLE,
  INDEX `fk_logbook_students1_idx` (`students_id` ASC) VISIBLE,
  CONSTRAINT `fk_logbook_schedule1`
    FOREIGN KEY (`schedule_id`)
    REFERENCES `csais_v2`.`schedule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_logbook_students1`
    FOREIGN KEY (`students_id`)
    REFERENCES `csais_v2`.`students` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csais_v2`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csais_v2`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csais_v2`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `csais_v2`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(100) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `secret_key` VARCHAR(45) NOT NULL,
  `students_id` INT NULL,
  `teachers_id` INT NULL,
  `roles_id` INT NOT NULL,
  `isactive` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) VISIBLE,
  INDEX `fk_users_students1_idx` (`students_id` ASC) VISIBLE,
  INDEX `fk_users_teachers1_idx` (`teachers_id` ASC) VISIBLE,
  INDEX `fk_users_roles1_idx` (`roles_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_students1`
    FOREIGN KEY (`students_id`)
    REFERENCES `csais_v2`.`students` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_teachers1`
    FOREIGN KEY (`teachers_id`)
    REFERENCES `csais_v2`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_roles1`
    FOREIGN KEY (`roles_id`)
    REFERENCES `csais_v2`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE `groups` DROP FOREIGN KEY `fk_grops_teachers1`; ALTER TABLE `groups` ADD CONSTRAINT `fk_grops_teachers1` FOREIGN KEY (`tutor_id`) REFERENCES `teachers`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
