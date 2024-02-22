import {} from "@/interfaces/IMenuLink";
import st from "./menu.module.css";

import LinkMenu from "@/components/MenuLink/MenuLink";
import { IMenu } from "@/interfaces/IMenu";

export default function Menu(props: IMenu) {
  return (
    <nav className={st.menu}>
      <div className={st.section}>
        {props.linksPage.map((link) => (
          <LinkMenu href={link.href} icon={link.icon} name={link.name} />
        ))}
      </div>
      <div className={st.section}>{props.children}</div>
    </nav>
  );
}
