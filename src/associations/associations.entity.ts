import { User } from "src/users/user.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public users: User[];
    @Column()
    public name: string;
    
    constructor(id: number, users: User[], name: string) {
        this.id = id;
        this.users = users;
        this.name = name;
        }
}