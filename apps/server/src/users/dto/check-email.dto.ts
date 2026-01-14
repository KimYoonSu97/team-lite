import { createUserSchema } from '@teamlite/types';
import { createZodDto } from 'nestjs-zod';

const emailCheckSchema = createUserSchema.pick({ email: true });
export class CheckEmailDto extends createZodDto(emailCheckSchema) {}
