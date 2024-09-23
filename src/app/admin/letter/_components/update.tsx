"use client";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import SelectLetter from "./select_letter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useSWR from "swr";
import useDialog from "@/global/gDialog";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const schema = z.object({
  about: z.string().min(1, "Perihal harus diisi"),
  date_of_letter: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Tanggal harus diisi dengan format (DD MM YYYY)",
  }),
  link: z.string().url("Format tidak valid").min(1, "Link harus diisi"),

  ownerId: z.number().min(1, "Pilih Opsi"),
});



const EditFormLetter = ({ id }: { id: number }) => {
  const [date, setDate] = useState<Date>();
  const { isEditDialogOpen,closeAllDialogs } = useDialog();
  const { data,isLoading} = useSWR(
    isEditDialogOpen? `http://localhost:4000/Letters/${id}`:null,
    fetcher
  );
  const { mutate: getLetter } = useSWR(`http://localhost:4000/Letters?q=`, fetcher);
  const {
    watch: Letter,
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues:{
      about: "",
      date_of_letter: "",
      link: "",
      ownerId: 0,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        about: data.about,
        date_of_letter: data.date_of_letter,
        link:data.link,
        ownerId:data.ownerId,      
      });
    }
  }, [data, reset]);

  const onSubmit = async (fodata: z.infer<typeof schema>) => {
      try{
        const response = await axios.patch(
          `http://localhost:4000/letters/${id}`,
          fodata
        );
        response;
        closeAllDialogs();
        getLetter();
        console.log("refresh");
      } catch (error) {
        console.error("Error:", error);
      }
    };

  if (isLoading) return <p>Loading....</p>;

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={closeAllDialogs}>
      <DialogContent className="sm:max-w-[425px] bg-[#e0e9f1]">
        <DialogHeader>
          <DialogTitle>Edit Letter</DialogTitle>
          <DialogDescription className="text-slate-800">
            Tambahkan data disini.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid-cols-4 items-center gap-4">
              <Label htmlFor="about" className="text-center">
                Perihal
              </Label>
              <Input id="about" {...register("about")} className="col-span-3" />
              {errors.about && (
                <p className="text-red-600">{errors.about.message}</p>
              )}
            </div>
            <div className="grid gap-2 py-2">
              <div>
                <Label htmlFor="link" className="text-">
                  Tanggal Surat
                </Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      " justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 " />
                    {Letter().date_of_letter ? (
                      dayjs(Letter().date_of_letter).format("DD MMMM YYYY")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#ced3df]">
                  <Calendar
                    mode="single"
                    selected={dayjs(Letter().date_of_letter).toDate()}
                    onSelect={(date) => {
                      setValue("date_of_letter", dayjs(date).toISOString());
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date_of_letter && (
                <p className="text-red-600">{errors.date_of_letter.message}</p>
              )}
            </div>
            <div className="grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-center">
                Link Website
              </Label>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Input
                    id="link"
                    {...register("link")}
                    className="col-span-3"
                  />
                  {errors.link && (
                    <p className="text-red-600">{errors.link.message}</p>
                  )}
                </div>
                <Button type="button" size="sm" className="px-3">
                  <span className="sr-only">Copy</span>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            

           
            <div className="grid-cols-4 items-center gap-4">
              <Label htmlFor="select" className="text-center">
                Departement
              </Label>
              <SelectLetter
                onChange={(value) => {
                  setValue("ownerId", value);
                  trigger("ownerId");
                }}
              />
              {errors.ownerId && (
                <p className="text-red-600">{errors.ownerId.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSubmit(onSubmit)}>
              Edit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFormLetter;
