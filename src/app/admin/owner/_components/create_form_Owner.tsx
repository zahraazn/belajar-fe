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
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mutate } from "swr";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  alias: z.string().min(1, "Alias harus diisi"),
});
const CreateFormOwner = () => {
  const [open, setOpen] = useState(false);
  const defaultValues: z.infer<typeof schema> = {
    name: "",
    alias: "",
  };
mutate('http://localhost:4000/owners?q=')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const response = await axios.post("http://localhost:4000/owners", data);

      console.log('execute')
      response;
      reset();
      setOpen(false);
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
          <DialogTitle>Tambah Departement</DialogTitle>
          <DialogDescription className="text-slate-800">
            Tambahkan Departement di sini.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">
                Name
              </Label>
              <Input id="name" {...register("name")} className="col-span-3" />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div className="grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-center">
                Alias
              </Label>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Input
                    id="link"
                    {...register("alias")}
                    className="col-span-3"
                  />
                  {errors.alias && (
                    <p className="text-red-600">{errors.alias.message}</p>
                  )}
                </div>
              </div>
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

export default CreateFormOwner;
