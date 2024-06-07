import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getPortfolio,
  getAllPortfolios,
  createPortfolio,
} from "@/actions/portfolioActions";

import { getIndicators } from "@/actions/financeActions";

const TestPage = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  const get_indicators = async () => {
    let response = await dispatch(getIndicators());
    let response2 = await dispatch(getAllPortfolios());
    console.log(response);
  };

  const add_new_portfolio = (body) => {
    console.log(body);
    dispatch(
      createPortfolio({
        name: "portfolio1",
        cost_basis: 0,
        market_value: 0,
        day_change: 0,
      }),
    );
  };

  const testAction = async () => {
    console.log("action çalıştırılıyor");
    const action = await dispatch(getAllPortfolios());
    if (!action.error) {
      setData(action.payload);
      console.log(action);
    }
  };

  let indicatorler = "";
  // const { user, status, error, isAuth } = useSelector((state) => state.user);
  // const {portfolios} = useSelector((state)=> state.portfolio )
  const { indicators } = useSelector((state) => state.finance);
  const { portfolios } = useSelector((state) => state.portfolio);
  return (
    <>
      <Typography variant="h3">
        TestPage
        <Button onClick={get_indicators}>Test Click</Button>
        <Button onClick={add_new_portfolio}>add a sample to portfolios</Button>
      </Typography>
      <Typography variant="h5">
        {data ? JSON.stringify(data) : "No data"}
      </Typography>
      <Typography>Portfolios: {Object.keys(indicators).join(" ,")}</Typography>
      <Typography>
        Object keys
        {
          //  typeof(portfolios)
          Object.keys(portfolios).join(" ,")
        }
      </Typography>
      {/* <Typography>{user?.token}</Typography> */}
    </>
  );
};

export default TestPage;
