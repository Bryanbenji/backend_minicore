import { VentaEntity } from "src/ventas/ventas.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'usuario'})
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    
    @Column({type: 'varchar',length: 80, nullable: false, unique: true})
    nombre: string;

    @Column({type: 'varchar', length: 10, nullable: false, unique: true})
    telefono: string;
    
    @Column({type: 'varchar', length: 60, nullable: false, unique: true})
    email: string;

    @OneToMany(() => VentaEntity, venta => venta.usuario)
    ventas: VentaEntity[];
  
    
}