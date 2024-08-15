import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class LoginDtoProps {
  email: string
  password: string
}
export class LoginDto {
  @ApiProperty({ description: 'User Login' })
  @IsEmail()
  email: string
  @ApiProperty({ description: 'User password' })
  @IsString()
  password: string

  constructor(props: LoginDtoProps) {
    this.email = props.email
    this.password = props.password
  }
}
