import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TiktokUser {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
