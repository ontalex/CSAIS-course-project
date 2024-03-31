import { T_Props } from "./props.type";

export interface I_Modal extends T_Props {
    open: boolean,
    onClose: () => void
}