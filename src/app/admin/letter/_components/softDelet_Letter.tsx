import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import useDialog from "@/global/gDialog";
import axios from "axios";
import { mutate } from "swr";
import { z } from "zod";
  
  const idSchema = z.number().positive();

  const SoftDeleteLetter = ({ id }: { id: number }) => {
    const { isDeletDialogOpen, closeAllDialogs } = useDialog();
    
  
   mutate (`http://localhost:4000/Letters?q=`);
    
    const handleDelete = async () => {
      try {
        
        idSchema.parse(id); 
  
        const response = await axios.delete(`http://localhost:4000/Letters/${id}`);
        console.log(`berhasil`, response.data);
  
        closeAllDialogs();
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("error:", error.errors);
        } else {
          console.error("gagal hapus letter:", error);
        }
      }
    }
   
  
    return (
      <AlertDialog open={  isDeletDialogOpen} onOpenChange={closeAllDialogs}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this website with ID: {id}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeAllDialogs}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default SoftDeleteLetter;
  