import st from '../style.module.css'

export default function LessonsItem(data) {
    return (
        <div className={st.item}>
            <p className={st.item_name}>{data.name}</p>
            <button
                className={st.item_delete}
                onClick={() => data.delete(data.id)}
            >
                <span>Удалить</span>
            </button>
        </div>
    )
}
