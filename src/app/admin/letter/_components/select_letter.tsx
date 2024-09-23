"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";

const selectletter = ({ onChange }: { onChange: (value: number) => void }) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(undefined);
  const [owners, setOwners] = useState<{ id: number; alias: string }[]>([]);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await axios.get("http://localhost:4000/owners?q=");
      setOwners(response.data);
    } catch (error) {
      console.log("Error fetching owners:", error);
    }
  };

  const handleValueChange = (value: string) => {
    const numberValue = Number(value);
    setSelectedValue(numberValue);
    onChange(numberValue);
  };

  return (
    <Select value={selectedValue?.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        {selectedValue ? `Selected: ${owners.find(owner => owner.id === selectedValue)?.alias}` : "Pilih opsi"}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Departement</SelectLabel>
          {owners.map((owner) => (
            <SelectItem key={owner.id} value={owner.id.toString()}>
              {owner.alias}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default selectletter;
