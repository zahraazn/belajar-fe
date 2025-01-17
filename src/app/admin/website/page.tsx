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

import React, { useState } from "react";
import axios from "axios";
import { IconEdit, IconTrashFilled } from "@tabler/icons-react";
import { IWebsite } from "@/interface/iWebsite";
import useSWR from "swr";
import EditFormWeb from "./_components/update_form_web";
import CreateFormWeb from "./_components/create_form_web";
import useDialog from "@/global/gDialog";
import SoftDeletWeb from "./_components/softDelet_web";



const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function WebsitePage() {
  const [search, setSearch] = useState<string>("");
  const {
    isEditDialogOpen,
    openDeletDialog,
    openEditDialog,
  } = useDialog();
  const [id, setid] = useState<number>(0);
  const [deletId, setDeletId] = useState<number>(0);

  console.log(id);

  const {
    data: website,
    isLoading,
    error,
  } = useSWR(`http://localhost:4000/website?q=${search}`, fetcher);
  if (error) return <p>gagal mendaaptkan API website</p>;
  if (isLoading) return <p>Loading....</p>;

  console.log(isEditDialogOpen);

  return (
    <div className="w-full flex flex-col gap-2 p-6 ">
      
      <Input
        placeholder="Cari Website Apa ?"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="flex flex-col gap-6">
        <p className="bg-gradient-to-r  from-[#1B2A41] via-[#324A5F] to-[#CCC9DC]
         text-white text-lg font-extrabold px-5 py-2 rounded-md 
         hover:scale-105 transition-transform duration-300">
          WEBSITE
        </p>
        <Table>
        <TableHeader className=" bg-gray-100 text-gray-600 ">
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead className="w-[300px]">Name Website</TableHead>
              <TableHead className="w-[300px]">Link Website</TableHead>
              <TableHead className="w-[200px]">Provider</TableHead>
              <TableHead className="w-[300px]">Jatuh tempo</TableHead>
              <TableHead className="w-[250px]">Departement</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {website.length > 0 ? (
              website?.map((website: IWebsite, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{website.name}</TableCell>
                  <TableCell>
                    <a
                      href={website.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline"
                    >
                      {website.link}
                    </a>
                  </TableCell>
                  <TableCell>{website.provider}</TableCell>
                  <TableCell>{website.payment_lastest}</TableCell>
                  <TableCell>{website.owner.name}</TableCell>
                  <TableCell className="flex space-x-3">
                    <button
                      onClick={() => {
                        setDeletId(website.id);
                        openDeletDialog();
                      }}
                      className="p-3 bg-transparent border border-red-500
                       text-red-500 rounded-full hover:bg-red-100 
                       focus:outline-none focus:ring-2 focus:ring-red-500 
                       transition-all duration-300"
                      aria-label="Delete"
                    >
                      <IconTrashFilled className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setid(website.id);
                        openEditDialog();
                      }}
                      className="p-3 bg-transparent border
                       border-blue-500 text-blue-500 rounded-full
                        hover:bg-blue-100 focus:outline-none focus:ring-2
                         focus:ring-blue-500 transition-all duration-300"
                      aria-label="Edit"
                    >
                      <IconEdit className="w-5 h-5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Data Not Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CreateFormWeb />
      <EditFormWeb id={id} />
      <SoftDeletWeb id={deletId} />
    
    </div>
  );
}

export default WebsitePage;
