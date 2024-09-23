"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "./navbar/page";
import { IconLogout } from "@tabler/icons-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useDialog from "@/global/gDialog";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/");
  };

  return (
    <div className="flex h-screen overflow-hidden ">
      <section
        className=" basis-2/12 border-spacing-x-12 bg-fixed bg-[#e5e9ec]"
        
      >
        <div>
          <h1 className="text-3xl text-center text-gray-950 font-bold">
            Puskomjar App
          </h1>
          <div className="flex flex-col gap-4 mt-8">
            <Navbar />
          </div>
          <div className="">
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="absolute bottom-0 left-0 h-16 w-16
             mt-4 bg-transparent text-black hover:bg-gradient-to-r  from-[#324A5F] 
             to-[#CCC9DC] transition-transform duration-300"
            >
              <IconLogout />
              </Button>
              <AlertDialog
                open={isDialogOpen}
                onOpenChange={() => setIsDialogOpen(false)}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                      apakah anda yakin akan logout?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
           
          </div>
        </div>
      </section>
      <section
        className="basis-full flex flex-col overflow-auto"
        style={{ backgroundColor: "#FFFBFA" }}
      >
        {children}
      </section>
    </div>
  );
}
