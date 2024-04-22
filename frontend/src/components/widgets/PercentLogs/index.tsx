import { useAuth } from '../../../hooks/useAuth'
import stylejoin from '../../../lib/stylejoin'
import { store } from '../../../store'
import { useLogbookPercentQuery } from '../../../store/csais/csais.api'
import Button from '../../Button'

import st from '../style.module.css'

export default function PercentLogs() {
    const { user } = useAuth()
    const queryPercent = useLogbookPercentQuery({
        token: user.token,
        day: new Date().toISOString().split('T')[0],
        group_id: store.getState().group.groupID,
    })
    return (
        <div className={stylejoin(st.card)}>
            <div className={st.card_head}>
                <p className={st.card_name}>Процент посещаемости</p>
                <Button onClick={queryPercent.refetch}>Обновить</Button>
            </div>
            <div className={stylejoin(st.card_body, st.max_height_1n4)}>
                {!isNaN(queryPercent.data?.percent) ? (
                    <p className={st.card_percent}>
                        {queryPercent.data?.percent}%
                    </p>
                ) : (
                    <p className={st.data_none}>Нету данных</p>
                )}
            </div>
        </div>
    )
}
