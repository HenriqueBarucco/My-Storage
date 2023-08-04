'use client';

import { Product } from '@prisma/client';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function ProductCard({product}: {product: Product}) {
    const handleClick = () => redirect(`/product/${product.id}`);
    return (
        <div className="card w-60 h-96 shadow-xl glass hover:cursor-pointer hover:shadow-2xl m-3" onClick={handleClick}>
            <figure className='w-60 h-40'>
                <Image src={product.image} alt={product.name} width={1920} height={1080} placeholder='blur' blurDataURL='https://github.com/henriquebarucco.png'/>
            </figure>
            <div className="card-body p-3">
                <h2 className="card-title">
                    {product.name}
                </h2>
                <p className='line-clamp-3'>{product.description}</p>
                <div className="card-actions justify-center">
                    <div className="badge badge-outline">Categoria 1</div> 
                    <div className="badge badge-outline">Categoria 2</div>
                </div>
            </div>
        </div>
    );
}