import st from './style.module.css'
import { T_Props } from '../../types/props.type'
import stylejoin from '../../lib/stylejoin'

export default function Button({ children, isLoading, ...props }: T_Props) {
    return (
        <button
            className={stylejoin(st.btn, isLoading ? st.btn_loading : '')}
            {...props}
        >
            {children}
        </button>
    )
}
