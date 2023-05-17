import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: '用户名', example: 'testName1' })
    @IsNotEmpty({ message: 'user.name is required.' })
    name: string;

    @ApiProperty({ description: '年龄', example: 18 })
    age: boolean;

    @ApiProperty({ description: '说明', example: 'nothing~' })
    description?: string;

    // @ApiProperty()
    // active?: boolean;
}
