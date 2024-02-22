import { IMenuLink } from "./IMenuLink";

export interface IMenu {
    linksPage: IMenuLink[]
    children: React.ReactNode,
}