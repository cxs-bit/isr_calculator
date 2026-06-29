import React from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Field,
  Fieldset,
  Heading,
  Highlight,
  HStack,
  Input,
  NativeSelect,
  NativeSelectField,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Form from "./Form";

const Layout = () => {
  return (
    <React.Fragment>
      <section id="#heading">
        <AbsoluteCenter>
          <Box
            p={"25px"}
            h="80vh"
            w="80vw"
            display="flex"
            flexDir="column"
            backgroundColor="bg.muted"
            borderRadius="lg"
            borderWidth="1px"
            borderColor={"gray.700"}
            spaceY={2}
          >
            {/* Header */}
            <Stack
              padding={"5"}
              minH="0"
              backgroundColor="gray.800"
              borderWidth="1px"
              borderRadius="lg"
              borderColor={"gray.700"}
            >
              <Heading p="" size="3xl" letterSpacing="tight">
                <Highlight query="ISR" styles={{ color: "teal.400" }}>
                  Calculadora de ISR
                </Highlight>
              </Heading>
              <Text fontSize="md" color="fg.muted">
                Calcula el impuesto sobre la renta de asalariados de manera
                sencilla.
              </Text>
            </Stack>
            <Form />
          </Box>
        </AbsoluteCenter>
      </section>
    </React.Fragment>
  );
};

function App() {
  return <Layout />;
}

export default App;
