import st from "./page.module.css";

export default function Admin() {
    return (
        <div className={st.page}>
            <div className={st.section_name}>
                <h1>Главная страница</h1>
            </div>
            <div className={st.content}>
                <h1>Главная</h1>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Velit praesentium aperiam commodi dignissimos cupiditate
                    iste fuga nobis sed temporibus quas magnam reiciendis
                    voluptatum veritatis amet nesciunt enim, ab dicta!
                    Asperiores.
                </p>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Velit praesentium aperiam commodi dignissimos cupiditate
                    iste fuga nobis sed temporibus quas magnam reiciendis
                    voluptatum veritatis amet nesciunt enim, ab dicta!
                    Asperiores.
                </p>
            </div>
        </div>
    );
}
