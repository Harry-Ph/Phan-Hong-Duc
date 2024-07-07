import { useContext } from "react";
import { ToastContext } from "../provider/ToastProvider";

export function useToast() {
  const context = useContext(ToastContext);
  return context?.state;
}
