'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <div className="navbar bg-base-200">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl" onClick={() => redirect('/')}>
                    <Image src={'/icon.png'} alt='Icon' width={32} height={32} />
                    My Storage
                </a>
            </div>
            <div className="flex-none gap-2">
                <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <h1>{session?.user?.name}</h1>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image src={'https://github.com/henriquebarucco.png'} alt='HB' width={720} height={720}/>                       
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li onClick={() => signOut()} ><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}