import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class PrismaClientManager implements OnModuleDestroy {
  private clients: { [key: string]: PrismaClient } = {};

  getTenantId(request: Request) {
    return (request.query.tenantId as string) || 'public';
  }

  getClient(request: Request): PrismaClient {
    const tenantId = this.getTenantId(request);

    let client = this.clients[tenantId];

    if (!client) {
      const databaseUrl = process.env.DATABASE_URL!.replace('public', tenantId);

      client = new PrismaClient({
        datasources: {
          db: {
            url: databaseUrl,
          },
        },
      });

      // setup prisma middlewares if any

      this.clients[tenantId] = client;
    }

    return client;
  }

  async onModuleDestroy() {
    await Promise.all(
      Object.values(this.clients).map((client) => client.$disconnect()),
    );
  }
}
