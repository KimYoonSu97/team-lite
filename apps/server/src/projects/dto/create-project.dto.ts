import { createProjectSchema } from '@teamlite/types';
import { createZodDto } from 'nestjs-zod';

export class CreateProjectDto extends createZodDto(createProjectSchema) {}
// export interface CreateProjectDto extends z.infer<typeof createProjectSchema> {}
