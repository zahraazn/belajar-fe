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
import { ILetter } from "@/interface/iLetter";
import useSWR from "swr";
import CreateFormLetter from "./_components/create_form_letter";
import EditFormLetter from "./_components/update";
import useDialog from "@/global/gDialog";
import SoftDeleteLetter from "./_components/softDelet_Letter";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function LetterPage() {
  const [search, setSearch] = useState<string>("");
  const {
    isEditDialogOpen,
    isDeletDialogOpen,
    openDeletDialog,
    openEditDialog,
  } = useDialog();
  const [id, setid] = useState<number>(0);
  const [deletId, setDeletId] = useState<number>(0);

  console.log(id);

  const {
    data: letter,
    isLoading,
    error,
  } = useSWR(`http://localhost:4000/Letters?q=${search}`, fetcher);
  if (error) return <p>gagal mendaaptkan API letter</p>;
  if (isLoading) return <p>Loading....</p>;

  console.log(isEditDialogOpen);

  return (
    <div className="w-full flex flex-col gap-2 p-6 ">
      <Input
        placeholder="Cari surat Apa ?"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
     <div className="flex flex-col gap-6">
        <p className="bg-gradient-to-r  from-[#1B2A41] via-[#324A5F] to-[#CCC9DC]
         text-white text-lg font-extrabold px-5 py-2 rounded-md 
         hover:scale-105 transition-transform duration-300">
        LETTER
        </p>
        <Table>
          <TableHeader className=" bg-gray-100 text-gray-600 ">
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead className="w-[300px]">Nomor Surat</TableHead>
              <TableHead className="w-[300px]">perihal</TableHead>
              <TableHead className="w-[300px]">Tanggal Surat</TableHead>
              <TableHead className="w-[200px]">Link Surat</TableHead>
              <TableHead className="w-[250px]">Departement</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {letter.length > 0 ? (
              letter?.map((letter: ILetter, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{letter.number}</TableCell>

                  <TableCell>{letter.about}</TableCell>
                  <TableCell>{letter.date_of_letter}</TableCell>
                  <TableCell>
                    <a
                      href={letter.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline"
                    >
                      {letter.link}
                    </a>
                  </TableCell>
                  <TableCell>{letter.owner.name}</TableCell>
                  <TableCell className="flex space-x-3">
                    <button
                      onClick={() => {
                        setDeletId(letter.id);
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
                        setid(letter.id);

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
      <CreateFormLetter />
      <EditFormLetter id={id} />
      <SoftDeleteLetter id={deletId} />
    </div>
  );
}

export default LetterPage;
