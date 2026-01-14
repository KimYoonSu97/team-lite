import { createZodDto } from 'nestjs-zod';
import { loginSchema } from '@teamlite/types';

export class LoginDto extends createZodDto(loginSchema) {}
