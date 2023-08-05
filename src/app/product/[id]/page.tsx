import Navbar from '@/components/navbar';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

export default async function Product({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions) as any;

    let product = await prisma.product.findUnique({
        where: {
            id: params.id,
            userId: session?.user?.id
        }
    });

    return (
        <main className='flex flex-col h-screen'>
            <Navbar name={session?.user?.name}/>
            <div className='flex-grow bg-base'>
                {product && (
                    <div className="hero min-h-full">
                        <div className="hero-content flex-col lg:flex-row w-4/5 h-2/4 bg-base-200 rounded-lg">
                            <Image src={product?.image} alt={product?.name} width={400} height={400} className="lg:w-[30%] rounded-lg shadow-2xl"/>
                            <div className='flex flex-col items-center justify-items-start w-full '>
                                <h1 className="text-5xl font-bold">{product?.name}</h1>
                                <p className="py-6">{product?.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}