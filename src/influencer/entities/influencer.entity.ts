import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TwitterUser } from 'src/twitter-user/entities/twitter-user.entity';
import { YoutubeChannel } from 'src/youtube-channel/entities/youtube-channel.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Influencer {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  influencerScore: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  twitterHandle: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  twitterId: number;

  @OneToOne(() => TwitterUser, (twitter) => twitter.influencer)
  @Field((type) => TwitterUser, {nullable: true})
  twitter: TwitterUser;

  @Column({ nullable: true })
  @Field({ nullable: true })
  youtubeChannelHandle: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  youtubeChannelId: number

  @OneToOne(() => YoutubeChannel, (youtubeChannel) => youtubeChannel.influencer)
  @Field((type) => YoutubeChannel, {nullable: true})
  youtubeChannel: YoutubeChannel

  @Column({ nullable: true })
  @Field({ nullable: true })
  tiktokId: number

  @Column({ nullable: true })
  @Field({ nullable: true })
  tiktokHandle: string

}
