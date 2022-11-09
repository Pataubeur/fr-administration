import { User } from "src/users/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    public id: number;
    @ManyToMany(type => User, { eager: true })
    @JoinTable()
    public users: User[];
    @Column()
    public name: string;
    
    constructor(id: number, users: User[], name: string) {
        this.id = id;
        this.users = users;
        this.name = name;
        }
}