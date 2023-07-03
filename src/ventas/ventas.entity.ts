import { UsuarioEntity } from "src/usuarios/usuarios.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'venta'})
export class VentaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date', nullable: false})
    fechaVenta: Date;

    @Column({type: 'varchar', length: 100, nullable: false})
    producto: string;

    @Column({type: 'float', nullable: false})
    cuotaMonto: number;
  
    @ManyToOne(() => UsuarioEntity, usuario => usuario.ventas)
    @JoinColumn({name: 'usuarioId'})
    usuario: UsuarioEntity;
}