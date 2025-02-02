import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity("auditorium")

class Auditorio {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({type: 'int'})
    capacity: number;
  
    @Column()
    location: string;
  
    @Column({ default: true})
    has_projector: boolean;
  
    @Column({ default: true })
    has_sound_system: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }

  export default Auditorio;