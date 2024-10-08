import React from "react";

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen: SetModalOpen, children }) => {
    return (
        <dialog id="my_modal_3" className={`modal ${modalOpen ? 'modal-open' : ''}`}>
            <div className="modal-box relative">

                <button onClick={() => SetModalOpen(false)}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                </button>
                {children}
            </div>
        </dialog>
    );
}

export default Modal;
