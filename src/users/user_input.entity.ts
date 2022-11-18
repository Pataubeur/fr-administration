import { ApiProperty } from "@nestjs/swagger";

export class UserInput {

//    password(lastname: string, firstname: string, age: number, password: any): import("./user.entity").User | PromiseLike<import("./user.entity").User> {
//        throw new Error('Method not implemented.');
//    }

    @ApiProperty({
        description: 'The firtname of the user',
        example: "John",
        type: String,
    })
    public firstname: string;

    @ApiProperty({
        description: 'The lastname of the user',
        example: "Doe",
        type: String,
    })
    public lastname: string;

    @ApiProperty({
        description: 'The age of the user',
        minimum: 18,
        default: 18,
        type: Number,
    })
    public age: number;

    @ApiProperty({
        description: 'The Password of the user',
        example: "jaimelescarrotes",
        type: String,
    })
    public password: string;

}