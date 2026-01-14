import { createZodDto } from 'nestjs-zod';
import { createTaskSchema } from '@teamlite/types';

export class CreateTaskDto extends createZodDto(createTaskSchema) {}
