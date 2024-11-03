import Logo from "../../public/Logo.jpg";
import Link from "next/link";
import Image from "next/image";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import ShoppingCartButton from "./ShoppingCartButton";
import UserButton from "@/components/UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import { getCollections } from "@/wix-api/collections";
import MainNavigation from "./api/MainNavigation";
import SearchField from "@/components/SearchField";
import MobileMenu from "./MobileMenu";
import { Suspense } from "react";



export default async function Navbar() {
  const wixClient = getWixServerClient()

  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient)
  ])

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-3">
        <Suspense>
        <MobileMenu 
        collections={collections}
        loggedInMember={loggedInMember}
        />
        </Suspense>
        <div className="flex flex-wrap items-center gap-4">
        <Link href="/" className="flex items-center gap-4">
          <Image src={Logo} alt="fashion store" width={100} height={100} />
        </Link>
        <MainNavigation collections={collections} 
        className="hidden lg:flex"
        />
        </div>
        <SearchField className="max-w-96 hidden lg:inline"/>
        <div className="flex items-center justify-center gap-4">
        <UserButton 
        loggedInMember={loggedInMember}
        className="hidden lg:inline-flex"
        />
        <ShoppingCartButton  initialData={cart}/>
        </div>
      </div>
    </header>
  );
}
