import { AriaToastRegionProps, useToastRegion } from "@react-aria/toast";
import { ToastState } from "@react-stately/toast";
import React, { useEffect } from "react";
import type { AriaToastProps } from "@react-aria/toast";
import { useToast } from "@react-aria/toast";

interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<T>;
}

interface ToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>;
}

function Toast<T extends React.ReactNode>({ state, ...props }: ToastProps<T>) {
  const ref = React.useRef(null);
  const { toastProps, titleProps } = useToast(props, state, ref);

  useEffect(() => {
    if (props.toast.timeout && (props.toast.timer as any)?.remaining === 0) {
      state.remove(props.toast.key);
    }
  }, [props.toast, state]);

  return (
    <div
      {...toastProps}
      ref={ref}
      className="border p-4 bg-blue-500 rounded-md shadow-md text-white"
    >
      <div {...titleProps}>{props.toast.content}</div>
    </div>
  );
}

export function ToastRegion<T extends React.ReactNode>({
  state,
  ...props
}: ToastRegionProps<T>) {
  const ref = React.useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);
  return (
    <div
      {...regionProps}
      ref={ref}
      className="fixed right-4 top-4 flex flex-col gap-2 z-50"
    >
      {state.visibleToasts.map((toast) => (
        <Toast state={state} key={toast.key} toast={toast} />
      ))}
    </div>
  );
}
