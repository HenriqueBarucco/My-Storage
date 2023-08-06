'use client';

import { Product } from '@prisma/client';
import { useEffect, useState } from 'react';
import ProductCard from './product-card';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ProductsList({ products }: { products: Product[]}) {
    const [productList, setProducts] = useState(products.filter((product) => !product.desire));
    const [desire, setDesire] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const search = searchParams.get('search');

    useEffect(() => {
        if (search) {
            setProducts(products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())));
        } else {
            router.replace(pathname);
            setProducts(products);
        }
    }, [search, pathname, router, products]);

    useEffect(() => {
        if (desire) {
            setProducts(products.filter((product) => product.desire));
        } else {
            setProducts(products.filter((product) => !product.desire));
        }
    }, [desire, products]);

    return (
        <>
            <div className="tabs justify-center pt-8">
                <a className={`tab tab-lifted ${desire ? '' : 'tab-active'}`} onClick={() => desire && setDesire(!desire)}>Meus Produtos</a> 
                <a className={`tab tab-lifted ${desire ? 'tab-active' : ''}`} onClick={() => !desire && setDesire(!desire)}>Lista de Desejos</a> 
            </div>
            <div className="flex flex-wrap max-w-full p-14 lg:justify-center">
                {productList.map((product, index) => (
                    <ProductCard key={index} product={product as any}/>
                ))}
            </div></>
    );
}