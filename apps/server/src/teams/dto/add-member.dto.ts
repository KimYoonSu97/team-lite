import { addMemberSchema, IAddMembersDto } from '@teamlite/types';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { createZodDto } from 'nestjs-zod';

export class AddMembersDto extends createZodDto(addMemberSchema) {}
