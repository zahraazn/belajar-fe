"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import React, { useState } from "react";
import { FaSquareWebAwesome, FaTencentWeibo } from "react-icons/fa6";
import { FcFolder, FcIntegratedWebcam } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage: React.FC = () => {
  const [websites, setWebsites] = useState([
    {
      id: 1,
      name: "Web Prodi Informatika" ,
      link : "https://if.universitasmulia.ac.id",
      provider: "exabytes",
      payment_latest: "12 Agustus 2024",
      owner: "prodi informatika",
      
    },
    {
      id: 2,
      name: "Web Smk Negeri 6 Balikpapan" ,
      link : "https://smkn6-bpn.sch.id/",
      provider: "hostinger",
      payment_latest: "14 Agustus 2024",
      owner: "RPL",
    },
  
  ]);

  console.log(websites);

  return (
    <div className="w-full">
        <Input placeholder="Cari Website Apa ?" />
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead className="w-[200px]">Name Website</TableHead>
                <TableHead className="w-[200px]">Link Website</TableHead>
                <TableHead className="w-[200px]">Provider</TableHead>
                <TableHead className="w-[200px]">Jatuh tempo</TableHead>
                <TableHead className="w-[100px]">Owner</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {websites.map((website, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{website.name}</TableCell>
                  <TableCell><Link href={website.link}>{website.link}</Link></TableCell>
                  <TableCell>{website.provider}</TableCell>
                  <TableCell>{website.payment_latest}</TableCell>
                  <TableCell>{website.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div>
            <button className="absolute bottom-0 right-24 h-56 w-8 ">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="http://localhost:3000/admin/owner" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </button>
          </div>
        </div>
    </div>
  );
};

export default HomePage;
