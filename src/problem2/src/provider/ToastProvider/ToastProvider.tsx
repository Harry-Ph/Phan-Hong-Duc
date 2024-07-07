import { ToastState, useToastState } from "@react-stately/toast";
import { createContext } from "react";
import { ToastRegion } from "../../components";

export const ToastContext = createContext<
  | {
      state: ToastState<React.ReactNode>;
    }
  | undefined
>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const state = useToastState<React.ReactNode>({
    maxVisibleToasts: 5,
    hasExitAnimation: true,
  });

  return (
    <ToastContext.Provider
      value={{
        state,
      }}
    >
      {children}
      {state.visibleToasts.length > 0 && <ToastRegion state={state} />}
    </ToastContext.Provider>
  );
}
