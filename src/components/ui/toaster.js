"use client";
import React from "react";
import { Toaster as ChakraToaster, Portal, Spinner, Stack, Toast, createToaster, } from "@chakra-ui/react";
export const toaster = createToaster({
    placement: "bottom-end",
    pauseOnPageIdle: true,
});
export const Toaster = () => {
    return (React.createElement(Portal, null,
        React.createElement(ChakraToaster, { toaster: toaster, insetInline: { mdDown: "4" } }, (toast) => (React.createElement(Toast.Root, { width: { md: "sm" } },
            toast.type === "loading" ? (React.createElement(Spinner, { size: "sm", color: "blue.solid" })) : (React.createElement(Toast.Indicator, null)),
            React.createElement(Stack, { gap: "1", flex: "1", maxWidth: "100%" },
                toast.title && React.createElement(Toast.Title, null, toast.title),
                toast.description && (React.createElement(Toast.Description, null, toast.description))),
            toast.action && (React.createElement(Toast.ActionTrigger, null, toast.action.label)),
            toast.closable && React.createElement(Toast.CloseTrigger, null))))));
};
