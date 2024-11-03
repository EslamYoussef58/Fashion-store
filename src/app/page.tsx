import Image from "next/image";
import React, { Suspense } from "react";
import banner from "../../public/main-banner-3.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { delay } from "@/lib/utils";
import { getWixClient } from "@/lib/wix-client.base";
import Products from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { getWixServerClient } from "@/lib/wix-client.server";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex items-center bg-secondary md:h-96">
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1 className="text-3xl font-semibold md:text-4xl">
            Classic Good Looks
          </h1>
          <p className="">
            Our favorite lightweight and layerable picks, in cool cotton, cozy
            cashmere and more.
          </p>
          <Button asChild className="rounded bg-pink-600 hover:bg-pink-500">
            <Link href="/shop">
              Shop Now <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>
        <div className="relative hidden h-full w-1/2 md:block">
          <Image src={banner} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent" />
        </div>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

async function FeaturedProducts() {
  

  const wixClient = getWixServerClient()

  const collection = await getCollectionBySlug(wixClient ,"featured-products")

  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await queryProducts(wixClient,{
    collectionIds: collection._id
  })


  if (!featuredProducts.items.length) {
    return null;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Featured Products</h2>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-3">
        {featuredProducts.items.map((product) => (
          <Products key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-3 lg:grid-cols-3 pt-14">
      {Array.from({length: 8}).map((_, i) => (
        <Skeleton  key={i} className="h-[29rem] w-full"/>
      ))}
    </div>
  )
}