import st from './style.module.css'
import { T_Props } from '../../types/props.type'

export default function Button({ children, ...props }: T_Props) {
    return (
        <button className={st.btn} {...props}>
            {children}
        </button>
    )
}
