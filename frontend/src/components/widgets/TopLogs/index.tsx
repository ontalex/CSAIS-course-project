import { useAuth } from '../../../hooks/useAuth'
import { customIntl } from '../../../lib/intl'
import stylejoin from '../../../lib/stylejoin'
import { store } from '../../../store'
import { useLogbookTopQuery } from '../../../store/csais/csais.api'
import Button from '../../Button'

import st from '../style.module.css'

export default function TopLogs() {
    const { user } = useAuth()
    const queryTop = useLogbookTopQuery({
        token: user.token,
        day: new Date().toISOString().split('T')[0],
        group_id: store.getState().group.groupID,
        type_log: 'н',
    })

    const intlLogs = customIntl(['метка', 'меток', 'метки'])

    return (
        <div className={stylejoin(st.card)}>
            <div className={st.card_head}>
                <p className={st.card_name}>Лидеры прогулов (текущая неделя)</p>
                <Button
                    onClick={queryTop.refetch}
                    disabled={!queryTop.isSuccess}
                    isLoading={queryTop.isLoading}
                >
                    Обновить
                </Button>
            </div>
            <div
                className={stylejoin(
                    st.card_body,
                    st.card_list,
                    st.max_height_3n4
                )}
            >
                {Boolean(queryTop.data?.length == 0) && (
                    <p className={st.data_none}>Нету данных</p>
                )}
                {Boolean(queryTop.data?.length > 0) &&
                    queryTop.data?.map((item) => (
                        <div
                            key={item.id}
                            className={stylejoin(
                                st.list_item,
                                st.item_flex_between_center
                            )}
                        >
                            <p>{item.fullname}</p>
                            <p>{intlLogs.run(item.count_logs)}</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}
