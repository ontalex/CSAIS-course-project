import { ILayout } from "@/interfaces/ILayout";
import st from "./page.module.css";
import Menu from "@/components/Menu/Menu";
import { IMenuLink } from "@/interfaces/IMenuLink";

export default function LayoutAdmin({children}: ILayout) {
    let links:IMenuLink[] = [
        {
            name: "Главная",
            href: "/admin",
            icon: <svg></svg>
        },
        {
            name: "Данные",
            href: "/admin/data",
            icon: <svg></svg>
        },
        {
            name: "Расписание",
            href: "/admin/schedule",
            icon: <svg></svg>
        },
        {
            name: "Журнал",
            href: "/admin/logbook",
            icon: <svg></svg>
        }
    ]
    return (
        <div className={st.page}>
            <Menu linksPage={links} >
                <button>Exit</button>
            </Menu>
            <div className={st.page_section}>
                {children}
            </div>
        </div>
    )
}