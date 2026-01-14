import { IsEmail, IsNotEmpty } from 'class-validator';
import { createUserSchema, ICheckEmailDto } from '@teamlite/types';
import { createZodDto } from 'nestjs-zod';

const emailCheckSchema = createUserSchema.pick('email');

export class CheckEmailDto extends createZodDto(emailCheckSchema) {}
