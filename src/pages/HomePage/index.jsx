import { Box,Button } from "@mui/material";
// import { getTrendings } from "@/actions/stockActions";
import { getPortfolio } from "@/actions/indiceActions";
import { useSelector,useDispatch } from "react-redux";
// TODO: bu trend değerini nasıl kullanabileceğine bak! 

const HomePage = () => {
  let { portfolio } = useSelector((state) => state.portfolio);
  let dispatch = useDispatch();
  return (
    <Box sx={{ textAlign: "center" }}>
      <h2>Home Page</h2>;
      <Button variant="contained" onClick={ async ()=> {
          let s = await dispatch(getPortfolio());
          console.log(s);
      } } >Çağır</Button>
      <p>{JSON.stringify(portfolio)}</p>
    </Box>
  );
};

export default HomePage;
