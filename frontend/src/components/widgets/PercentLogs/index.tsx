import stylejoin from '../../../lib/stylejoin'
import Button from '../../Button'

import st from '../style.module.css'

export default function PercentLogs({ typeLog }: { typeLog: string }) {
    return (
        <div className={stylejoin(st.card)}>
            <div className={st.card_head}>
                <p className={st.card_name}>Процент посещаемости</p>
                <Button>Обновить</Button>
            </div>
            <div className={stylejoin(st.card_body, st.max_height_1n4)}>
                <p>{}</p>
            </div>
        </div>
    )
}
