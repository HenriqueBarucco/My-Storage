import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query'],
    });

async function main() {
    /***********************************/
    /* SOFT DELETE MIDDLEWARE */
    /***********************************/

    prisma.$use(async (params, next) => {
        // Check incoming query type
        if (params.model == 'Product') {
            if (params.action == 'delete') {
                // Delete queries
                // Change action to an update
                params.action = 'update';
                params.args['data'] = { deleted: new Date() };
            }
            if (params.action == 'deleteMany') {
                // Delete many queries
                params.action = 'updateMany';
                if (params.args.data != undefined) {
                    params.args.data['deleted'] = new Date();
                } else {
                    params.args['data'] = { deleted: new Date() };
                }
            }
        }
        return next(params);
    });
}

main();

if (process.env.NODE_ENV != 'production') globalForPrisma.prisma as any;
