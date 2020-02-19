import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import ModalView from './styles'
import { SizeType } from './constants'

interface IModalProps {
    children: React.ReactNode;
    show: boolean;
    onClose:() => void;
    size: SizeType;
    title?: string;
}

const Modal = ({ children, show = true, size, onClose, title }: IModalProps) => {
    const modal = useRef<HTMLDivElement>();

    const handleClickOutside = (event: any): void => {
        const element: any = event.target
        if (modal.current && !modal.current.contains(element)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside, true);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true);
        }
    })

    return ReactDOM.createPortal(
        (
            <ModalView size={size} show={show}>
                <div className="modal-view-wrapper" ref={modal}>
                    <div className="modal-view-header">
                        {!!title && <h5 className="modal-view-title">{title}</h5>}
                        <button className="modal-view-btn" type="button" onClick={onClose}>&times;</button>
                    </div>
                    <div className="modal-view-body">
                        {children}
                    </div>
                </div>
            </ModalView>
        ),
        document.getElementById('modal')
    )
}

export default Modal