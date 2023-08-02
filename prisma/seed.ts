import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.product.create({
        data: {
            name: 'Produto 1',
            description: 'Descrição do produto 1',
            price: 10.00,
            quantity: 1,
            isAtBox: false,
            location: 'Localização do produto 1',
            observations: 'Observações do produto 1',
            Category: {
                create: {
                    name: 'Categoria 1',
                }
            },
            User: {
                create: {
                    name: 'Henrique Barucco',
                    email: 'henrique@email.com',
                    username: 'admin',
                    password: 'admin',
                    
                }
            },
            image: new Buffer(''),
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });