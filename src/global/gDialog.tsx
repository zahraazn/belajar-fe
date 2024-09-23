import {create} from 'zustand';


interface DialogState {
  isEditDialogOpen: boolean;
  isDeletDialogOpen: boolean;
  openEditDialog: () => void;
  openDeletDialog: () => void;
  closeAllDialogs: () => void;
}


const useDialog = create<DialogState>((set) => ({
  isEditDialogOpen: false,
  isDeletDialogOpen: false,
  
  openEditDialog: () => set(() => ({ isEditDialogOpen: true, isDeletDialogOpen: false })),
  openDeletDialog: () => set(() => ({ isDeletDialogOpen: true, isEditDialogOpen: false })),
  closeAllDialogs: () => set(() => ({ isEditDialogOpen: false, isDeletDialogOpen: false })),
}));

export default useDialog;
