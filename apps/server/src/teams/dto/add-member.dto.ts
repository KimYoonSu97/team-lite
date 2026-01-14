import { addMemberSchema } from '@teamlite/types';
import { createZodDto } from 'nestjs-zod';

export class AddMembersDto extends createZodDto(addMemberSchema) {}
