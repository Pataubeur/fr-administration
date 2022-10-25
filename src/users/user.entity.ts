import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public lastname: string;
    @Column()
    public firstname: string;
    @Column()
    public age: number;

    constructor(id: number, lastname: string, firstname: string, age: number) {
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.age = age;
    }
}