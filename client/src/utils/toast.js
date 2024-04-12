import { toast } from "react-toastify";

export const toastSuccess = (text)=>{
    toast.success(text);
}
export const toastError = (text)=>{
    toast.error(text);
}