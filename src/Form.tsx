import {
  VStack,
  HStack,
  Fieldset,
  Field,
  NativeSelect,
  NativeSelectField,
  Input,
  RadioGroup,
  Button,
  Stack,
  Text,
  Heading,
  Table,
} from "@chakra-ui/react";
import React, { type FormEvent, useState } from "react";
import { BsCalculatorFill } from "react-icons/bs";

type FormValues = {
  incomeType: string;
  income: string;
  salaryType: string;
};

type CalculationResult = {
  netSalary: number;
  netYearlySalary: number;
  deductions: number;
  tasa: string;
  tax: number;
};

const calculateResults = (values: FormValues): CalculationResult => {
  console.log("Submitting calculation values:", values);

  let income = parseFloat(values.income);
  let deductions = (income * 5.91) / 100;
  let tax = 0;
  let tasa = "";
  const incomeType = parseInt(values.incomeType);
  const salaryType = parseInt(values.salaryType);

  if (salaryType === 2) {
    income = income - deductions;
  } else {
    deductions = 0;
  }

  if (incomeType === 1) {
    income = income * 12;
    console.log(income);
  } else if (incomeType === 3) {
    income = income * 24;
    console.log(income);
  }

  switch (true) {
    case income <= 416220.01:
      tax = 0;
      tasa = "Exento";
      break;

    case income <= 624329.01:
      tax = (income - 416220.01) * 0.15;
      tasa = "15% del excedente de RD$416,220.01";
      break;

    case income <= 867123.01:
      tax = (income - 624329.01) * 0.2 + 31216;
      tasa = "​RD$31,216.00 más el 20% del excedente de RD$624,329.01";
      break;

    default:
      tax = 79776 + (income - 867123.01) * 0.25;
      tasa = "RD$79,776.00 más el 25% del excedente de RD$867,123.01";
      break;
  }

  income = income / 12;
  tax = tax / 12;

  return {
    netSalary: income,
    netYearlySalary: income * 12,
    deductions,
    tasa,
    tax,
  };
};

const renderCalculationsTable = (result: CalculationResult) => (
  <>
    <Heading size="xl">Resultados del calculo:</Heading>
    <Table.Root>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Salario Neto Mensual:</Table.Cell>
          <Table.Cell>RD${result.netSalary.toFixed(2)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Salario Neto Anual:</Table.Cell>
          <Table.Cell>RD${result.netYearlySalary.toFixed(2)}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Deducciones (SFS y AFP):</Table.Cell>
          <Table.Cell>
            {result.deductions === 0
              ? "El salario es neto"
              : `RD$${result.deductions.toFixed(2)}`}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Tasa</Table.Cell>
          <Table.Cell>{result.tasa}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>ISR a pagar Mensual:</Table.Cell>
          <Table.Cell>
            {result.tax === 0 ? "Exento" : `RD$${result.tax.toFixed(2)}`}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  </>
);

const Form = () => {
  const [incomeType, setIncomeType] = useState("1");
  const [income, setIncome] = useState("");
  const [salaryType, setSalaryType] = useState("2");
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCalculationResult(calculateResults({ incomeType, income, salaryType }));
  };

  return (
    <VStack
      p="20px"
      flex="1"
      minH="0"
      maxH="100%"
      overflowY="auto"
      overflowX="hidden"
      backgroundColor="gray.800"
      borderWidth="1px"
      borderColor="gray.700"
      borderRadius="lg"
      spaceY={2}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <VStack w="full" gap={4}>
          <HStack w="full" flexWrap="wrap" gap={4}>
            <Fieldset.Root>
              <Fieldset.Content>
                <HStack gap="6">
                  <Field.Root required>
                    <HStack gap={1}>
                      <Field.Label>Tipo de Ingresos</Field.Label>
                      <Field.RequiredIndicator />
                    </HStack>
                    <NativeSelect.Root size="lg" variant="subtle">
                      <NativeSelectField
                        id="incomeType"
                        value={incomeType}
                        onChange={(e) => setIncomeType(e.target.value)}
                      >
                        <option value="1">Ingresos mensuales</option>
                        <option value="2">Ingresos anuales</option>
                        <option value="3">Ingresos quincenales</option>
                      </NativeSelectField>
                    </NativeSelect.Root>
                  </Field.Root>

                  <Field.Root required>
                    <HStack gap={1}>
                      <Field.Label>Ingresos</Field.Label>
                      <Field.RequiredIndicator />
                    </HStack>
                    <Input
                      id="income"
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      variant="subtle"
                      size="lg"
                      placeholder="Ej. 15000..."
                    />
                  </Field.Root>
                </HStack>
              </Fieldset.Content>
            </Fieldset.Root>
          </HStack>

          <HStack
            w="full"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={4}
          >
            <RadioGroup.Root
              id="salaryType"
              value={salaryType}
              defaultValue="2"
              colorPalette="teal"
              onValueChange={(details) => setSalaryType(details.value ?? "2")}
            >
              <HStack flex="1" gap={6}>
                <RadioGroup.Item key="1" value="1">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>Salario Neto</RadioGroup.ItemText>
                </RadioGroup.Item>

                <RadioGroup.Item key="2" value="2">
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator />
                  <RadioGroup.ItemText>Salario Bruto</RadioGroup.ItemText>
                </RadioGroup.Item>
              </HStack>
            </RadioGroup.Root>

            <Button
              type="submit"
              colorPalette="teal"
              size="lg"
              w="150px"
              variant="solid"
            >
              Calcular
              <BsCalculatorFill size="lg" color="white" />
            </Button>
          </HStack>

          {calculationResult && (
            <Stack
              w="full"
              backgroundColor="gray.900"
              p={4}
              borderRadius="md"
              overflowX="auto"
            >
              {renderCalculationsTable(calculationResult)}
            </Stack>
          )}

          <Stack backgroundColor="gray.500" w="full"></Stack>
        </VStack>
      </form>
    </VStack>
  );
};

export default Form;
