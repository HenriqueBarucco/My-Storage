import Image from 'next/image';

export default function ProductCard() {
    return (
        <div className="card w-64 shadow-xl glass">
            <figure>
                <Image src={'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?cs=srgb&dl=daylight-environment-forest-459225.jpg&fm=jpg'} alt='TESTE' width={1920} height={1080}/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    Shoes!
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div> 
                    <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
    );
}