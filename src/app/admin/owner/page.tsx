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
} from "@/components/ui/pagination";
import React, { useState } from "react";

const HomePage: React.FC = () => {
  const [owner, setOwner] = useState([
    {
      id: 1,
      name: "Program Studi Informatika",
      nickname: "Prodi Informatika",
    },
    {
      id: 2,
      name: "Rekayasa Perangkat Lunak",
      nickname: "Rpl",
    },
  ]);

  console.log(owner);

  return (
    <div className="w-full">
        <Input placeholder="Cari Website Apa ?" />
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead className="w-[200px]">Nama</TableHead>
                <TableHead className="w-[200px]">Alias</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {owner.map((owner, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{owner.name}</TableCell>
                  <TableCell>{owner.nickname}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div>
            <button className="absolute bottom-0 right-24 h-56 w-8 ">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink href="http://localhost:3000/admin/website">
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem></PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="http://localhost:3000/admin/website/owner">
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationEllipsis />
                </PaginationContent>
              </Pagination>
            </button>
          </div>
        </div>
    </div>
  );
};

export default HomePage;
