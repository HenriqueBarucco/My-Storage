'use client';

import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
    const [isAtBox, setIsAtBox] = useState(product.isAtBox);

    const handleBoxStatus = async () => {
        setIsAtBox(!isAtBox);
        fetch('/api/product', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: product.id})
        });
    };

    return (
        <div className="card w-60 h-96 shadow-xl bg-base-300 hover:shadow-2xl m-3">
            <Link href={`/product/${product.id}`} className='hover:cursor-default'>
                <figure className="w-60 h-40 hover:cursor-pointer">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={1920}
                        height={1080}
                        placeholder="blur"
                        blurDataURL="https://github.com/henriquebarucco.png"
                    />
                </figure>
            </Link>
            <div className="card-body p-3">
                <div className='flex flex-row'>
                    <h2 className="flex-auto justify-center items-center font-semibold mb-3 text-center">
                        {product.name}
                    </h2>
                    <div className="w-6 hover:cursor-pointer" onClick={handleBoxStatus}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            className={`w-6 h-6 flex-shrink-0 ml-auto ${
                                isAtBox
                                    ? 'stroke-primary'
                                    : 'stroke-current'
                            }`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                            />
                        </svg>
                    </div>
                </div>
                <p className="line-clamp-3 mb-16">{product.description}</p>
                <div className="card-actions justify-center">
                    <div className="badge badge-outline">{product.category}</div>
                    {product.location && 
                            <div className="badge badge-outline"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            {product.location}
                        
                            </div>}
                    {product.quantity > 1 ? (<div className="badge badge-outline">{product.quantity}</div>) : <></>}
                </div>
            </div>
        </div>
    );
}
