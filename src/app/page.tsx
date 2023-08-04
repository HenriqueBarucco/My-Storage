import Navbar from '@/components/navbar';
import ProductCard from '@/components/product-card';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export default async function Home() {
    const session = await getServerSession(authOptions) as any;

    let products = await prisma.product.findMany({
        where: {
            userId: session?.user?.id
        },
        orderBy: {
            name: 'asc'
        },
    });

    return (
        <main className='flex flex-col h-screen'>
            <Navbar name={session?.user?.name}/>
            <div className='flex-grow bg-base'>
                <div className="flex flex-wrap max-w-full p-14 lg:justify-center">
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product as any}/>
                    ))}
                </div>
            </div>
        </main>
    );
}