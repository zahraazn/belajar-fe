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
import axios from "axios";
import { useEffect,useState } from "react";
import React from "react";
import SelectOwner from "./select_owner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useSWR from "swr";
import useDialog from "@/global/gDialog";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const schema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  link: z.string().url("Format tidak valid").min(1, "Link harus diisi"),
  provider: z.string().min(1, "Provider harus diisi"),
  payment_lastest: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Tanggal harus diisi dengan format (DD MM YYYY)",
  }),
  ownerId: z.number().min(1, "Pilih Opsi Owner"),
});

const EditFormWeb = ({ id }: { id: number }) => {
  const [date, setDate] = useState<Date>();
  const { isEditDialogOpen,closeAllDialogs } = useDialog();
  const { data, isLoading} = useSWR(
    isEditDialogOpen ? `http://localhost:4000/website/${id}`:null,
    fetcher
  );
  const { mutate: getLetter } = useSWR(`http://localhost:4000/website?q=`, fetcher);
  const {
    watch: websites,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues:{
      name: "",
      link: "",
      provider: "",
      payment_lastest: "",
      ownerId: 0,
    },
  });
  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        link: data.link,
        provider: data.provider,
        payment_lastest: data.payment_lastest,
        ownerId: data.ownerId,
      });
    }
  }, [data, reset]);

  const onSubmit = async (fdata: z.infer<typeof schema>) => {
    try{
      const response = await axios.patch(
        `http://localhost:4000/website/${id}`,
        fdata
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
      <DialogContent className="sm:max-w-[425px]  bg-[#e0e9f1]">
        <DialogHeader>
          <DialogTitle>Edit Website</DialogTitle>
          <DialogDescription className="text-slate-950">
            Tambahkan data disini.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">
                Name Website
              </Label>
              <Input id="name" {...register("name")} className="col-span-3" />
              {errors.name && (
                <p className="text-red-600">{errors.name.message}</p>
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
              <Label htmlFor="provider" className="text-center">
                Provider
              </Label>
              <Input
                id="provider"
                {...register("provider")}
                className="col-span-3"
              />
              {errors.provider && (
                <p className="text-red-600">{errors.provider.message}</p>
              )}
            </div>

            <div className="grid gap-2 py-2">
              <div>
                <Label htmlFor="link" className="text-">
                  Jatuh Tempo
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
                    {websites().payment_lastest ? (
                      dayjs(websites().payment_lastest).format("DD MMMM YYYY")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#dadfec]">
                  <Calendar
                    mode="single"
                    selected={dayjs(websites().payment_lastest).toDate()}
                    onSelect={(date) => {
                      setValue("payment_lastest", dayjs(date).toISOString());
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.payment_lastest && (
                <p className="text-red-600">{errors.payment_lastest.message}</p>
              )}
            </div>

            <div className="grid-cols-4 items-center gap-4">
              <Label htmlFor="select" className="text-center">
                owner
              </Label>
              <SelectOwner 
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

export default EditFormWeb;
