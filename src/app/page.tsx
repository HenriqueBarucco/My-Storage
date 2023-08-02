import Navbar from '@/components/navbar';

export default function Home() {
    return (
        <main className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex-grow bg-slate-700 flex justify-center items-center'>
                <p className='text-white text-xl font-bold'>My-Storage 1.0</p>
            </div>
        </main>
    );
}
