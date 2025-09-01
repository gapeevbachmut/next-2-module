// // components/Modal/Modal.tsx

// 'use client';

// import { useRouter } from 'next/navigation';

// type Props = {
//   onClose: () => void;

//   children: React.ReactNode;
// };

// const Modal = ({ onClose, children }: Props) => {
//   const router = useRouter();

//   const close = () => router.back();

//   return (
//     <div>
//       <div>
//         {children}
//         <button onClick={close}>Close</button>
//       </div>
//     </div>
//   );
// };

// export default Modal;

'use client';

import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
