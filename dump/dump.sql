-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema grafot76_sirio
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema grafot76_sirio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `grafot76_sirio` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `grafot76_sirio` ;

-- -----------------------------------------------------
-- Table `grafot76_sirio`.`professional_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grafot76_sirio`.`professional_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  `situation` VARCHAR(45) NULL,
  `updatedAt` DATETIME NULL,
  `createdAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `grafot76_sirio`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grafot76_sirio`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `situation` VARCHAR(45) NULL,
  `updatedAt` DATETIME NULL,
  `createdAt` DATETIME NULL,
  PRIMARY KEY (`id`, `type`),
  INDEX `fk_professional_professional_type_idx` (`type` ASC),
  CONSTRAINT `fk_professional_professional_type`
    FOREIGN KEY (`type`)
    REFERENCES `grafot76_sirio`.`professional_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `grafot76_sirio`.`professional_type`
-- -----------------------------------------------------
START TRANSACTION;
USE `grafot76_sirio`;
INSERT INTO `grafot76_sirio`.`professional_type` (`id`, `description`, `situation`, `updatedAt`, `createdAt`) VALUES (1, 'Médico', 'ativo', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `grafot76_sirio`.`professional_type` (`id`, `description`, `situation`, `updatedAt`, `createdAt`) VALUES (2, 'Enfermeiro(a)', 'ativo', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `grafot76_sirio`.`professional_type` (`id`, `description`, `situation`, `updatedAt`, `createdAt`) VALUES (3, 'Desenvolvedor(a)', 'ativo', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `grafot76_sirio`.`professional_type` (`id`, `description`, `situation`, `updatedAt`, `createdAt`) VALUES (4, 'Diretor(a)', 'ativo', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `grafot76_sirio`.`professional_type` (`id`, `description`, `situation`, `updatedAt`, `createdAt`) VALUES (5, 'Auxiliar de limpeza', 'ativo', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `grafot76_sirio`.`professional_type` (`id`, `description`, `situation`, `updatedAt`, `createdAt`) VALUES (6, 'Segurança', 'ativo', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `grafot76_sirio`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `grafot76_sirio`;
INSERT INTO `grafot76_sirio`.`user` (`id`, `type`, `name`, `phone`, `email`, `situation`, `updatedAt`, `createdAt`) VALUES (1, 1, 'Maria Helena Halls', '(11) 95905-7362', 'maria.helena@sirio.com.br', 'ativo', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `grafot76_sirio`.`user` (`id`, `type`, `name`, `phone`, `email`, `situation`, `updatedAt`, `createdAt`) VALUES (2, 2, 'Juliana dos Anjos', '(11) 98763-3466', 'juliana.anjos@sirio.com.br', 'inativo', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `grafot76_sirio`.`user` (`id`, `type`, `name`, `phone`, `email`, `situation`, `updatedAt`, `createdAt`) VALUES (3, 3, 'Roberto dos Santos Vital', '(11) 98763-3466', 'roberto.vital@sirio.com.br', 'ativo', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `grafot76_sirio`.`user` (`id`, `type`, `name`, `phone`, `email`, `situation`, `updatedAt`, `createdAt`) VALUES (4, 4, 'Adriana Ferraz Albuquerque', '(11) 98763-3466', 'adriana.ferraz@sirio.com.br', 'ativo', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `grafot76_sirio`.`user` (`id`, `type`, `name`, `phone`, `email`, `situation`, `updatedAt`, `createdAt`) VALUES (5, 5, 'Eliz Socorro da Ajuda', '(11) 98763-3466', 'eliz.socorro@sirio.com.br', 'inativo', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `grafot76_sirio`.`user` (`id`, `type`, `name`, `phone`, `email`, `situation`, `updatedAt`, `createdAt`) VALUES (6, 6, 'Thiago Augusto da Silva', '(11) 98763-3466', 'thiago.augusto@sirio.com.br', 'inativo', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

COMMIT;

