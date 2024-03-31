import React, { useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import style from './style.module.css'
import { I_Modal } from '../../types/modal.type'

const Modal = ({ open, onClose, children }: I_Modal) => {
    const element = useMemo(() => document.createElement('div'), [])
    const modalRootElement = useMemo(() => document.querySelector('#modal'), [])

    useEffect(() => {
        if (open) {
            modalRootElement.appendChild(element)

            return () => {
                modalRootElement.removeChild(element)
            }
        }
    })

    if (open) {
        return createPortal(
            <div className={style.modal_background} onClick={onClose}>
                <div
                    className={style.modal_card}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>,
            element
        )
    }

    return null
}

export default Modal
