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
  `updatedAt` TIMESTAMP NULL,
  `createdAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `grafot76_sirio`.`professional`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `grafot76_sirio`.`professional` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `professional_type_id` INT NOT NULL,
  `situation` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `updatedAt` TIMESTAMP NULL,
  `createdAt` TIMESTAMP NULL,
  PRIMARY KEY (`id`, `professional_type_id`),
  INDEX `fk_professional_professional_type_idx` (`professional_type_id` ASC) ,
  CONSTRAINT `fk_professional_professional_type`
    FOREIGN KEY (`professional_type_id`)
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
INSERT INTO `grafot76_sirio`.`professional_type` (`id`, `description`, `situation`, `updatedAt`, `createdAt`) VALUES (1, 'Médico(a)', 'ativo', '1687881917', '1687881917');
INSERT INTO `grafot76_sirio`.`professional_type` (`id`, `description`, `situation`, `updatedAt`, `createdAt`) VALUES (2, 'Enfermeiro(a)', 'ativo', '1687881917', '1687881917');
INSERT INTO `grafot76_sirio`.`professional_type` (`id`, `description`, `situation`, `updatedAt`, `createdAt`) VALUES (3, 'Desenvolvedor(a)', 'ativo', '1687881917', '1687881917');
INSERT INTO `grafot76_sirio`.`professional_type` (`id`, `description`, `situation`, `updatedAt`, `createdAt`) VALUES (4, 'Diretor(a)', 'ativo', '1687881917', '1687881917');
INSERT INTO `grafot76_sirio`.`professional_type` (`id`, `description`, `situation`, `updatedAt`, `createdAt`) VALUES (5, 'Auxiliar de limpeza', 'ativo', '1687881917', '1687881917');
INSERT INTO `grafot76_sirio`.`professional_type` (`id`, `description`, `situation`, `updatedAt`, `createdAt`) VALUES (6, 'Segurança', 'ativo', '1687881917', '1687881917');

COMMIT;


-- -----------------------------------------------------
-- Data for table `grafot76_sirio`.`professional`
-- -----------------------------------------------------
START TRANSACTION;
USE `grafot76_sirio`;
INSERT INTO `grafot76_sirio`.`professional` (`id`, `professional_type_id`, `situation`, `name`, `phone`, `email`, `updatedAt`, `createdAt`) VALUES (1, 1, 'ativo', 'Maria Helena Halls', '(11) 95905-7362', 'maria.helena@sirio.com.br', '1687881917', '1687881917');
INSERT INTO `grafot76_sirio`.`professional` (`id`, `professional_type_id`, `situation`, `name`, `phone`, `email`, `updatedAt`, `createdAt`) VALUES (2, 2, 'inativo', 'Juliana dos Anjos', '(11) 98763-3466', 'juliana.anjos@sirio.com.br', '1687881917', '1687881917');
INSERT INTO `grafot76_sirio`.`professional` (`id`, `professional_type_id`, `situation`, `name`, `phone`, `email`, `updatedAt`, `createdAt`) VALUES (3, 3, 'ativo', 'Roberto dos Santos Vital', '(11) 98763-3466', 'roberto.vital@sirio.com.br', '1687881917', '1687881917');
INSERT INTO `grafot76_sirio`.`professional` (`id`, `professional_type_id`, `situation`, `name`, `phone`, `email`, `updatedAt`, `createdAt`) VALUES (4, 4, 'ativo', 'Adriana Ferraz Albuquerque', '(11) 98763-3466', 'adriana.ferraz@sirio.com.br', '1687881917', '1687881917');
INSERT INTO `grafot76_sirio`.`professional` (`id`, `professional_type_id`, `situation`, `name`, `phone`, `email`, `updatedAt`, `createdAt`) VALUES (5, 5, 'inativo', 'Eliz Socorro da Ajuda', '(11) 98763-3466', 'eliz.socorro@sirio.com.br', '1687881917', '1687881917');
INSERT INTO `grafot76_sirio`.`professional` (`id`, `professional_type_id`, `situation`, `name`, `phone`, `email`, `updatedAt`, `createdAt`) VALUES (6, 6, 'inativo', 'Thiago Augusto da Silva', '(11) 98763-3466', 'thiago.augusto@sirio.com.br', '1687881917', '1687881917');

COMMIT;

