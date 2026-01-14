import { updateTaskSchema } from '@teamlite/types';
import { createZodDto } from 'nestjs-zod';

export class PatchTaskStatusDto extends createZodDto(updateTaskSchema) {}
