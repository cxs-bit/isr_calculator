import React from "react";
import { AbsoluteCenter, Box, Heading, Highlight, Stack, Text, } from "@chakra-ui/react";
import Form from "./Form";
const Layout = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement("section", { id: "#heading" },
            React.createElement(AbsoluteCenter, null,
                React.createElement(Box, { w: { base: "95vw", md: "80vw" }, h: { base: "auto", md: "80vh" }, p: { base: "16px", md: "25px" }, display: "flex", flexDir: "column", backgroundColor: "bg.muted", borderRadius: "lg", borderWidth: "1px", borderColor: "gray.700", spaceY: 2, overflow: "hidden" },
                    React.createElement(Stack, { padding: "5", minH: "0", backgroundColor: "gray.800", borderWidth: "1px", borderRadius: "lg", borderColor: "gray.700" },
                        React.createElement(Heading, { p: "", size: "3xl", letterSpacing: "tight" },
                            React.createElement(Highlight, { query: "ISR", styles: { color: "teal.400" } }, "Calculadora de ISR")),
                        React.createElement(Text, { fontSize: "md", color: "fg.muted" }, "Calcula el impuesto sobre la renta de asalariados de manera sencilla.")),
                    React.createElement(Form, null))))));
};
function App() {
    return React.createElement(Layout, null);
}
export default App;
