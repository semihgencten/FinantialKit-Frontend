import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { getCashflow } from "@/actions/financeActions";

const TestPage = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const testAction = async () => {
    const action = await dispatch(
      getCashflow({
        names: ["aapl", "msft"],
        period: "1mo",
        interval: "1d",
        range: "annual",
      }),
    );
    if (!action.error) setData(action.payload);
  };
  return (
    <>
      <Typography variant="h3">
        TestPage
        <Button onClick={testAction}>Test Click</Button>
      </Typography>
      <Typography variant="h5">
        {data ? JSON.stringify(data) : "No data"}
      </Typography>
    </>
  );
};

export default TestPage;
