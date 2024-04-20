import { MigrationInterface, QueryRunner } from "typeorm";
export declare class First1713540339227 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
