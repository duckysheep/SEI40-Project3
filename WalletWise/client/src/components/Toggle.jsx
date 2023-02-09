import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function Toggle({ transactionInfo, setTransactionInfo }) {
  const [alignment, setAlignment] = React.useState("income");

  const handleChange = (event, newAlignment) => {
    setTransactionInfo({
      ...transactionInfo,
      type: newAlignment,
    });
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="income">Income</ToggleButton>
      <ToggleButton value="expense">Expense</ToggleButton>
    </ToggleButtonGroup>
  );
}
