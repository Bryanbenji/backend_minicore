import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from './config/constants';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dirname } from 'path';
import { UsuarioEntity } from './usuarios/usuarios.entity';
import { UsuarioModule } from './usuarios/usuarios.module';
import { VentaEntity } from './ventas/ventas.entity';
import { VentasModule } from './ventas/ventas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [UsuarioEntity, VentaEntity],
        synchronize: true,
        logging: false
      }),
      inject: [ConfigService],
    }),
    UsuarioModule,
    VentasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}