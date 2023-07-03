import { VentaEntity } from './ventas.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(VentaEntity)
export class VentasRepository extends Repository<VentaEntity> {
    
}