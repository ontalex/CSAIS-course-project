-- MySQL Script generated by MySQL Workbench
-- Mon Mar 18 13:31:25 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`lessons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`lessons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`teachers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`teachers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`schedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`schedule` (
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
    REFERENCES `mydb`.`lessons` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_schedule_teachers1`
    FOREIGN KEY (`teachers_id_first`)
    REFERENCES `mydb`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_schedule_teachers2`
    FOREIGN KEY (`teachers_id_second`)
    REFERENCES `mydb`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`groups` (
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
    REFERENCES `mydb`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`students`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`students` (
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
    REFERENCES `mydb`.`groups` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`logbook`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`logbook` (
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
    REFERENCES `mydb`.`schedule` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_logbook_students1`
    FOREIGN KEY (`students_id`)
    REFERENCES `mydb`.`students` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
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
    REFERENCES `mydb`.`students` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_teachers1`
    FOREIGN KEY (`teachers_id`)
    REFERENCES `mydb`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_roles1`
    FOREIGN KEY (`roles_id`)
    REFERENCES `mydb`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;