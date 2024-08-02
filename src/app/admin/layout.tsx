"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaElementor } from "react-icons/fa6";

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  const router = useRouter()
  
  return (
    <div className="flex h-screen">
      <section className="bg-zinc-300 basis-2/12 border-spacing-x-12">
        <div>
          <h1 className="text-3xl text-center text-gray-950 font-bold">
            Puskomjar App
          </h1>
          <div className="flex flex-col gap-3 mt-8">
            <Button onClick={() => router.push('/admin/website')}>Website
        
            
            </Button>

            <Button onClick={() => router.push('/admin/owner')}>Owner</Button>
            
          </div>
        </div>
      </section>
      <section className="bg-white basis-10/12 p-3">{children}</section>
    </div>
  );
}
