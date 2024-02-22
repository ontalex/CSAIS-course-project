import Link from "next/link";
import st from "./menulink.module.css";
import { IMenuLink } from "@/interfaces/IMenuLink";

export default function MenuLink(props: IMenuLink) {
  return (
    <Link href={props.href} className={st.link}>
      {props.icon}
      <p className={st.link_name}>{props.name}</p>
    </Link>
  );
}
