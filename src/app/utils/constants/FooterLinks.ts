import FooterLinksObject from "../types/FooterLinkObject";
import { Links } from "./Links";

// Footer Links Constant
export const FooterLinks: FooterLinksObject = {
    ecosystem: Links.filter((_, index) => index <= 3),
    social: Links.filter((_, index) => index > 3 && index <= 5)
}