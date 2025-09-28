import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const Footer = () => {
    return (
        <div className="bg-white flex items-center justify-around py-2 mt-16">
            <img src={"/images/footer-logo.png"} className="w-72 h-auto" alt="logo" />
            <div className="flex items-center gap-4 h-4">
                <Button asChild variant="link" className="text-[#76A0B5]">
                    <Link href={"#"}>About</Link>
                </Button>
                <Separator className="h-[10px]" orientation="vertical" />
                <Button asChild variant="link" className="text-[#76A0B5]">
                    <Link href={"#"}>Jobs</Link>
                </Button>
                <Separator className="h-[10px]" orientation="vertical" />
                <Button asChild variant="link" className="text-[#76A0B5]">
                    <Link href={"#"}>Pricing</Link>
                </Button>
                <Separator className="h-[10px]" orientation="vertical" />
                <Button asChild variant="link" className="text-[#76A0B5]">
                    <Link href={"#"}>Shop</Link>
                </Button>
                <Separator className="h-[10px]" orientation="vertical" />
                <Button asChild variant="link" className="text-[#76A0B5]">
                    <Link href={"#"}>Privacy Policy</Link>
                </Button>
                <Separator className="h-[10px]" orientation="vertical" />
                <Button asChild variant="link" className="text-[#76A0B5]">
                    <Link href={"#"}>Cookie Policy</Link>
                </Button>
                <Separator className="h-[10px]" orientation="vertical" />
                <Button asChild variant="link" className="text-[#76A0B5]">
                    <Link href={"#"}>Contact Us</Link>
                </Button>
            </div>
        </div>
    )
}

export default Footer;
