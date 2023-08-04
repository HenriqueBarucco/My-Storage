import AddProduct from './add-product-form';

export default function AddProductModal() {
    return (
        <>
            <button className="btn btn-ghost btn-circle" onClick={() => window.modal.showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
            <dialog id="modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() =>  window.modal.close()}>✕</button>
                    <h3 className="font-bold text-lg">Adicionar produto</h3>
                    <AddProduct/>
                </div>
            </dialog>
        </>
    );
}