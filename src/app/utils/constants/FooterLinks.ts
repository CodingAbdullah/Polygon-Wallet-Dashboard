import FooterLinksObject from "../types/FooterLinkObject";
import { Links } from "./Links";

// Footer Links Constant
export const FooterLinks: FooterLinksObject = {
    ecosystem: Links.filter((_, index) => index <= 2),
    social: Links.filter((_, index) => index > 2 && index <= 4)
}