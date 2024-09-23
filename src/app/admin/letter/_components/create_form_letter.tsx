"use client";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SelectLetter from "./select_letter";


const schema = z.object({
  about: z.string().min(1, "Perihal harus diisi"),
  date_of_letter: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Tanggal harus diisi dengan format (DD MM YYYY)",
  }),
  link: z.string().url("Format tidak valid").min(1, "Link harus diisi"),

  ownerId: z.number().min(1, "Pilih Opsi Owner"),
});

const CreateFormLetter= () => {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const defaultValues: z.infer<typeof schema> = {
    about: "",
    date_of_letter: "",
    link: "",

    ownerId: 0,
  };

  const {
    watch: websites,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const response = await axios.post("http://localhost:4000/Letters", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response data:", response.data);
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="absolute bottom-12 right-12 hover:bg-gradient-to-r bg-transparent
          text-black font-extrabold from-[#324A5F] to-[#CCC9DC] transition-transform 
          duration-300 p-2 w-12 h-12 rounded-full flex items-center justify-center"
         onClick={() => setOpen(true)}
        >
          <IconPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#e0e9f1]">
        <DialogHeader>
          <DialogTitle>Tambah Website</DialogTitle>
          <DialogDescription className="text-slate-800">
            Tambahkan Websitemu di sini.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">
                Perihal
              </Label>
              <Input
                id="name"
                {...register("about")}
                className="col-span-3"
              />
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
                      " justify-start text-left font-normal ",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4  " />
                    {websites().date_of_letter ? (
                      dayjs(websites().date_of_letter).format("DD MMMM YYYY")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#aeb5c7]">
                  <Calendar
                  className=""
                    mode="single"
                    selected={dayjs(websites().date_of_letter).toDate()}
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
                Link Surat
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
                <Button type="button" size="sm" className="px-3  bg-slate-800">
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
                onChange={(value: number) => {
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
          <Button type="submit" style={{ backgroundColor: "#1B2A41" }}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormLetter;
