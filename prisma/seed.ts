import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
    await prisma.product.create({
        data: {
            name: 'Mechanike K500',
            description: 'Descrição do teclado',
            price: 180.00,
            quantity: 1,
            isAtBox: true,
            location: 'Guarda-Roupa',
            observations: 'Novo',
            Category: {
                create: {
                    name: 'Teclado',
                }
            },
            User: {
                create: {
                    name: 'Henrique Barucco',
                    email: 'henrique@email.com',
                    username: 'admin',
                    password: await hash('admin1234', 12)
                    
                }
            },
            image: 'https://media.karousell.com/media/photos/products/2022/12/17/mechanike_k500_keycaps_only_10_1671269414_52f246f0.jpg',
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