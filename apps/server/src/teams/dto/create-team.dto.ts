import { createTeamSchema } from '@teamlite/types';
import { createZodDto } from 'nestjs-zod';

export class CreateTeamDto extends createZodDto(createTeamSchema) {}
