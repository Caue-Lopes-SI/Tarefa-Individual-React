import type { ReactNode } from "react";
import styles from "./styles.module.css"
import closeBtn from "../../assets/close.png"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode
    className?: string;
}

export default function Modal({isOpen, onClose, children, className}:ModalProps) {
    if(!isOpen) return null

    return(
      <div className={styles.overlay} onClick={onClose}>
       <div className={`${styles.content} ${className||""}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={closeBtn} alt="fechar aba"/>
        </button>
        {children}
      </div>
    </div>
  );
}