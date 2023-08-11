'use client';

import { signOut } from 'next-auth/react';
import AddProductModal from './add-product/add-product-modal';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar({ name }: { name: string }) {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        router.push(pathname + '?search=' + searchQuery);
    }, [searchQuery, pathname, router]);

    return (
        <div className="navbar bg-base-200">
            <div className="flex-1">
                <Link href={'/'} className="btn btn-ghost normal-case text-xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        className="w-6 h-6 stroke-primary"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                    </svg>
                    My Storage
                </Link>
            </div>
            <div className="flex-none gap-2">
                <AddProductModal />
                <div className="form-control">
                    <input
                        type="text"
                        value={searchQuery}
                        placeholder="Procurar"
                        className="input input-bordered w-24 md:w-auto"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="dropdown dropdown-end">
                    <h1>{name}</h1>
                </div>
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 text-center stroke-primary justify-center">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
                    >
                        <li onClick={() => signOut()}>
                            <a>Sair</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
