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
import CreateFormOwner from "./_components/create_form_Owner";
import { IOwnr } from "@/interface/iOwner";
import useSWR from "swr";
import EditForm from "./_components/update_form_Dep";
import useDialog from "@/global/gDialog";

import SoftDeleteOwner from "./_components/soft_delet";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function Ownerpage() {
  const [search, setSearch] = useState<string>("");
  const { isEditDialogOpen, openDeletDialog, openEditDialog } = useDialog();
  const [id, setid] = useState<number>(0);
  const [deletId, setDeletId] = useState<number>(0);

  const { data: owner, error } = useSWR(
    `http://localhost:4000/owners?q=${search}`,
    fetcher
  );
  const isLoading = !owner && !error;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <div>gagal mendaaptkan API owner</div>;

  console.log(isEditDialogOpen);

  return (
    <div className="w-full flex flex-col gap-2 p-6 ">
      <Input
        placeholder="Cari Departement apa ?"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <div className="flex flex-col gap-6">
        <p
          className="bg-gradient-to-r  from-[#1B2A41] via-[#324A5F] to-[#CCC9DC]
         text-white text-lg font-extrabold px-5 py-2 rounded-md 
         hover:scale-105 transition-transform duration-300"
        >
          DEPARTEMENT
        </p>
        <Table>
          <TableHeader className=" bg-gray-100 text-gray-600 ">
            <TableRow>
              <TableHead className="w-[400px]">No</TableHead>
              <TableHead className="w-[600px]">Name</TableHead>
              <TableHead className="w-[400px]">Alias</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {owner.length > 0 ? (
              owner?.map((owner: IOwnr, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{owner.name}</TableCell>
                  <TableCell>{owner.alias}</TableCell>
                  <TableCell className="flex space-x-3">
                    <button
                      onClick={() => {
                        setDeletId(owner.id);
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
                        setid(owner.id);

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
                <TableCell className="text-center">Data Not Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CreateFormOwner />
      <EditForm id={id} />
      <SoftDeleteOwner id={deletId} />
    </div>
  );
}
export default Ownerpage;
