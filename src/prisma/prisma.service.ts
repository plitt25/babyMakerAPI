import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // ✅ Usa el nuevo método addListener, que Prisma v6 sí reconoce
    this.$extends({
      query: {
        async $allOperations({ query, args }) {
          return query(args);
        },
      },
    });

    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
