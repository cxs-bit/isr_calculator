import { VStack, HStack, Fieldset, Field, NativeSelect, NativeSelectField, Input, RadioGroup, Button, Stack, Heading, Table, } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsCalculatorFill } from "react-icons/bs";
const calculateResults = (values) => {
    console.log("Submitting calculation values:", values);
    let income = parseFloat(values.income);
    let deductions = (income * 5.91) / 100;
    let tax = 0;
    let tasa = "";
    const incomeType = parseInt(values.incomeType);
    const salaryType = parseInt(values.salaryType);
    if (salaryType === 2) {
        income = income - deductions;
    }
    else {
        deductions = 0;
    }
    if (incomeType === 1) {
        income = income * 12;
        console.log(income);
    }
    else if (incomeType === 3) {
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
const renderCalculationsTable = (result) => (React.createElement(React.Fragment, null,
    React.createElement(Heading, { size: "xl" }, "Resultados del calculo:"),
    React.createElement(Table.Root, null,
        React.createElement(Table.Body, null,
            React.createElement(Table.Row, null,
                React.createElement(Table.Cell, null, "Salario Neto Mensual:"),
                React.createElement(Table.Cell, null,
                    "RD$",
                    result.netSalary.toFixed(2))),
            React.createElement(Table.Row, null,
                React.createElement(Table.Cell, null, "Salario Neto Anual:"),
                React.createElement(Table.Cell, null,
                    "RD$",
                    result.netYearlySalary.toFixed(2))),
            React.createElement(Table.Row, null,
                React.createElement(Table.Cell, null, "Deducciones (SFS y AFP):"),
                React.createElement(Table.Cell, null, result.deductions === 0
                    ? "El salario es neto"
                    : `RD$${result.deductions.toFixed(2)}`)),
            React.createElement(Table.Row, null,
                React.createElement(Table.Cell, null, "Tasa"),
                React.createElement(Table.Cell, null, result.tasa)),
            React.createElement(Table.Row, null,
                React.createElement(Table.Cell, null, "ISR a pagar Mensual:"),
                React.createElement(Table.Cell, null, result.tax === 0 ? "Exento" : `RD$${result.tax.toFixed(2)}`))))));
const Form = () => {
    const [incomeType, setIncomeType] = useState("1");
    const [income, setIncome] = useState("");
    const [salaryType, setSalaryType] = useState("2");
    const [calculationResult, setCalculationResult] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        setCalculationResult(calculateResults({ incomeType, income, salaryType }));
    };
    return (React.createElement(VStack, { p: "20px", flex: "1", minH: "0", backgroundColor: "gray.800", borderWidth: "1px", borderColor: "gray.700", borderRadius: "lg", spaceY: 2 },
        React.createElement("form", { onSubmit: handleSubmit, style: { width: "100%" } },
            React.createElement(VStack, { w: "full", gap: 4 },
                React.createElement(HStack, { w: "full" },
                    React.createElement(Fieldset.Root, null,
                        React.createElement(Fieldset.Content, null,
                            React.createElement(HStack, { gap: "6" },
                                React.createElement(Field.Root, { required: true },
                                    React.createElement(HStack, { gap: 1 },
                                        React.createElement(Field.Label, null, "Tipo de Ingresos"),
                                        React.createElement(Field.RequiredIndicator, null)),
                                    React.createElement(NativeSelect.Root, { size: "lg", variant: "subtle" },
                                        React.createElement(NativeSelectField, { id: "incomeType", value: incomeType, onChange: (e) => setIncomeType(e.target.value) },
                                            React.createElement("option", { value: "1" }, "Ingresos mensuales"),
                                            React.createElement("option", { value: "2" }, "Ingresos anuales"),
                                            React.createElement("option", { value: "3" }, "Ingresos quincenales")))),
                                React.createElement(Field.Root, { required: true },
                                    React.createElement(HStack, { gap: 1 },
                                        React.createElement(Field.Label, null, "Ingresos"),
                                        React.createElement(Field.RequiredIndicator, null)),
                                    React.createElement(Input, { id: "income", type: "number", value: income, onChange: (e) => setIncome(e.target.value), variant: "subtle", size: "lg", placeholder: "Ej. 15000..." })))))),
                React.createElement(HStack, { w: "full", justifyContent: "space-between" },
                    React.createElement(RadioGroup.Root, { id: "salaryType", value: salaryType, defaultValue: "2", colorPalette: "teal", onValueChange: (details) => setSalaryType(details.value ?? "2") },
                        React.createElement(HStack, { flex: "1", gap: 6 },
                            React.createElement(RadioGroup.Item, { key: "1", value: "1" },
                                React.createElement(RadioGroup.ItemHiddenInput, null),
                                React.createElement(RadioGroup.ItemIndicator, null),
                                React.createElement(RadioGroup.ItemText, null, "Salario Neto")),
                            React.createElement(RadioGroup.Item, { key: "2", value: "2" },
                                React.createElement(RadioGroup.ItemHiddenInput, null),
                                React.createElement(RadioGroup.ItemIndicator, null),
                                React.createElement(RadioGroup.ItemText, null, "Salario Bruto")))),
                    React.createElement(Button, { type: "submit", colorPalette: "teal", size: "lg", w: "150px", variant: "solid" },
                        "Calcular",
                        React.createElement(BsCalculatorFill, { size: "lg", color: "white" }))),
                calculationResult && (React.createElement(Stack, { w: "full", backgroundColor: "gray.900", p: 4, borderRadius: "md" }, renderCalculationsTable(calculationResult))),
                React.createElement(Stack, { backgroundColor: "gray.500", w: "full" })))));
};
export default Form;
