import { addProjectMemberSchema } from '@teamlite/types';
import { createZodDto } from 'nestjs-zod';

export class AddProjectMemberDto extends createZodDto(addProjectMemberSchema) {}

// export interface AddProjectMemberDto extends z.infer<
//   typeof addProjectMemberSchema
// > {}
