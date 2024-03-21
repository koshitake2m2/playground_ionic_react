import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm'
import { Post } from './post'

@Entity('author')
export class Author {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('text')
  name!: string

  @Column('text', { nullable: true })
  birthday!: string

  @Column('text', { unique: true })
  email!: string

  @OneToMany((type) => Post, (post) => post.author)
  posts!: Post[]
}
