import st from "./page.module.css";

import React from 'react'

export default function Logbook() {
  return (
    <div className={st.page}>
            <div className={st.section_name}>
                <h1>Журнал</h1>
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
  )
}
