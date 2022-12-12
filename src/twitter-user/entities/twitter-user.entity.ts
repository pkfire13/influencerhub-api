import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Influencer } from 'src/influencer/entities/influencer.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class TwitterUser {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  twitterHandle: string;

  @Column({ nullable: true })
  @Field()
  followers: number;

  @OneToOne(() => Influencer, (influencer) => influencer.twitter)
  @Field((type) => Influencer, { nullable: true })
  influencer: Influencer;
}
