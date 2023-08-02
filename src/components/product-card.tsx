import Image from 'next/image';

export default function ProductCard() {
    return (
        <div className="card w-60 shadow-xl glass">
            <figure>
                <Image src={'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg'} alt='TESTE' width={1920} height={1080}/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    Produto
                </h2>
                <p className='line-clamp-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi obcaecati ducimus laboriosam rerum labore...</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Categoria 1</div> 
                    <div className="badge badge-outline">Categoria 2</div>
                </div>
            </div>
        </div>
    );
}