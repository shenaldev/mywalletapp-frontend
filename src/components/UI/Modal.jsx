import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export const ModalContent = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
    <DialogPrimitive.Content
      {...props}
      ref={forwardedRef}
      onPointerDownOutside={(e) => e.preventDefault()}
      className="data-[state=open]:animate-contentShow fixed overflow-y-auto top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-md focus:outline-none"
    >
      {children}
      <DialogPrimitive.Close
        className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[20px] right-[20px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
        aria-label="Close"
        asChild
      >
        <Cross2Icon className="cursor-pointer" color="#FF5F4F" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;
