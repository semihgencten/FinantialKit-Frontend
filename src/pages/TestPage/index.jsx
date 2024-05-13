import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getPortfolio,getAllPortfolios,createPortfolio } from "@/actions/portfolioActions";

const TestPage = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  const add_new_portfoli = (body)=>{
    console.log(body);
    dispatch(createPortfolio(
      {
        "name": "portfolio1",
        "cost_basis": 0,
        "market_value": 0,
        "day_change": 0
      }));
  }

  const testAction = async () => {
    console.log("action çalıştırılıyor");
    const action = await dispatch(
      getAllPortfolios()
    );
    if (!action.error){
        setData(action.payload)
        console.log(action);
      }
  };

  const {user,status,error,isAuth} = useSelector((state)=> state.user);
  return (
    <>
      <Typography variant="h3">
        TestPage
        <Button onClick={testAction}>Test Click</Button>
        <Button onClick={add_new_portfoli}>add a sample to portfolios</Button>
      </Typography>
      <Typography variant="h5">
        {data ? JSON.stringify(data) : "No data"}
      </Typography>
      <Typography>
        {user?.token}
      </Typography>
    </>
  );
};

export default TestPage;
