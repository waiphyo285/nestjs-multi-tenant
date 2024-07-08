import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { FactoryProvider, Module, Scope } from '@nestjs/common';
import { PrismaClientManager } from './prisma-client-manager';

const prismaClientProvider: FactoryProvider<PrismaClient> = {
  provide: PrismaClient,
  scope: Scope.REQUEST,
  inject: [REQUEST, PrismaClientManager],
  useFactory: (request: Request, manager: PrismaClientManager) =>
    manager.getClient(request),
};

@Module({
  providers: [PrismaClientManager, prismaClientProvider],
  exports: [PrismaClient],
})
export class DatabaseModule {}
