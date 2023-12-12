import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React, { forwardRef } from "react";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuContent = React.forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content {...props} ref={forwardedRef}>
        {children}
        <DropdownMenuPrimitive.Arrow className="fill-white shadow-md" />
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});

export const DropdownMenuItem = React.forwardRef(({ children, ...props }, forwardRef) => {
  return (
    <DropdownMenuPrimitive.Item {...props} ref={forwardRef} asChild className="mb-2 hover:outline-none">
      {children}
    </DropdownMenuPrimitive.Item>
  );
});
