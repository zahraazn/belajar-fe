"use client";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useSWR from "swr";
import useDialog from "@/global/gDialog";
import { useEffect } from "react";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const schema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  alias: z.string().min(1, "Alias harus diisi"),
});

const EditForm = ({ id }: { id: number }) => {
  const { isEditDialogOpen,closeAllDialogs } = useDialog();
  const { data, error, isLoading, mutate } = useSWR(
    isEditDialogOpen ? `http://localhost:4000/owners/${id}` : null,
    fetcher
  );
  const { mutate: getOwners } = useSWR(`http://localhost:4000/owners?q=`, fetcher);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      alias: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        alias: data.alias,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: z.infer<typeof schema>) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/owners/${id}`,
        formData
      );
      response;
      closeAllDialogs();
      getOwners();
      console.log("refresh");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (error)
    return (
      <p>Error: {error.response?.data?.message || "Error loading data"}</p>
    );
  if (isLoading) return <p>Loading....</p>;
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={closeAllDialogs}>
      <DialogContent className="sm:max-w-[425px] bg-[#e0e9f1]">
        <DialogHeader>
          <DialogTitle className="font-bold">Edit Department</DialogTitle>
          <DialogDescription className="text-black">
            Silahkan tambahkan data disini.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" {...register("name")} className="col-span-3" />
              {errors.name && (
                <p className="text-red-600">{errors.name?.message}</p>
              )}
            </div>
            <div className="grid-cols-4 items-center gap-4">
              <Label htmlFor="alias" className="text-right">
                Alias
              </Label>
              <Input id="alias" {...register("alias")} className="col-span-3" />
              {errors.alias && (
                <p className="text-red-600">{errors.alias?.message}</p>
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

export default EditForm;
