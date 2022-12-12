import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTiktokUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
