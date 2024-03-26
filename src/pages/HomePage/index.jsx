import { Box,Button } from "@mui/material";
import { getWatchlist } from "@/actions/userActions";
// import { trendSlice } from "@/reducers/stockSlice";
import { useSelector,useDispatch } from "react-redux";
// TODO: bu trend değerini nasıl kullanabileceğine bak! 

const HomePage = () => {
  let state = useSelector(state => state.trend.trends);
  let dispatch = useDispatch();
  return (
    <Box sx={{ textAlign: "center" }}>
      <h2>Home Page</h2>;
      <Button variant="contained" onClick={ async ()=> {
          let s = dispatch(getWatchlist());
          console.log(s);
      } } >Çağır</Button>
      {/* <p>{{state}}</p> */}
    </Box>
  );
};

export default HomePage;
