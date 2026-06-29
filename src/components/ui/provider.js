"use client";
import React from "react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
export function Provider(props) {
    return (React.createElement(ChakraProvider, { value: defaultSystem },
        React.createElement(ColorModeProvider, { ...props })));
}
