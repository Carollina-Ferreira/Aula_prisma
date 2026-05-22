/*
  Warnings:

  - Added the required column `numero` to the `escola` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `escola` ADD COLUMN `numero` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `aluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `idade` INTEGER NOT NULL,
    `escolaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `aluno` ADD CONSTRAINT `aluno_escolaId_fkey` FOREIGN KEY (`escolaId`) REFERENCES `escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
