'use client';

import { Product } from '@prisma/client';
import Image from 'next/image';

export default function ProductView({ product }: { product: Product }) {
    const deleteProduct = async () => {
        try {
            await fetch('/api/product', {
                method: 'DELETE',
                body: JSON.stringify({ id: product.id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error: any) {
            console.error(error);
        }
    };

    const boughtProduct = async () => {
        try {
            await fetch('/api/product', {
                method: 'PUT',
                body: JSON.stringify({ id: product.id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="bg-base-200 shadow-lg rounded-lg flex p-8 w-4/5">
            <div className="w-[60%] p-8">
                <Image
                    src={product?.image}
                    alt={product?.name}
                    width={700}
                    height={700}
                    className="rounded-lg shadow-2xl"
                />
            </div>

            <div className="flex flex-col w-screen h-auto pl-4">
                <div className="flex-grow">
                    <div className="flex flex-grow justify-center space-x-3 items-center mb-4">
                        <h1 className="text-4xl font-semibold">
                            {product.name}
                        </h1>
                        {product.quantity > 1 ? (
                            <>
                                <div className="p-1 bg-neutral rounded-box h-1/2">
                                    <span className="font-mono text-1xl">
                                        {product.quantity}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className="flex items-end -mt-8">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            className={`w-6 h-6 flex-shrink-0 ml-auto ${
                                product.isAtBox
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
                    <p className="text-1xl text-center">
                        {product.description}
                    </p>
                    <p className="text-1xl align-bottom">
                        Localização: {product.location}
                    </p>
                    <p className="text-1xl align-bottom">
                        Preço: {product.price}
                    </p>
                </div>
                <div className="flex flex-row justify-center space-x-4">
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                        </svg>
                    </button>
                    <button onClick={boughtProduct} hidden={!product.desire}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                        </svg>
                    </button>
                    <button onClick={deleteProduct}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 stroke-red-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
