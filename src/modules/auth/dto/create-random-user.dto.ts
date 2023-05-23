import { ResponseUserDto } from '../../user/dto';

export class createRandomUserDTO extends ResponseUserDto {
  displayName: string;
  token: string;
}
