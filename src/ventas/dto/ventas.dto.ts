import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class VentasDto {

    

    @IsNotBlank({ message: 'la fecha de venta del producto no puede estar vacío' })
    fechaVenta?: Date;


    @IsNumber()
    @IsNotEmpty()
    usuarioId ?: number;


    @IsNotBlank({ message: 'el nombre del producto no puede estar vacío' })
    producto?: string;


    @IsNumber()
    @IsNotEmpty()
    @Min(0.10, { message: 'el monto debe de ser al menos de 0.10 centavos' })
    cuotaMonto?: number;
    
}