import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getCashflow } from "@/actions/financeActions";
import { loginUser,registerUser } from "@/actions/authActions";

const TestPage = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const testReg = async () => {
    const action = await dispatch(
      registerUser({
    //   "username": "cool-username",
    //   "email": "user@example.com",
    //   "password": "string",
    //   "password2": "string"
          "username":"selamlar",
          "email":"selam@mail.com",
          "password" : "0,123456selam",
          "password2": "0,123456selam"
      })
    )
  }
  const testAction = async () => {
    console.log("action çalıştırılıyor");
    const action = await dispatch(
      loginUser({
        username:"selamlar",
        password:"0,123456selam"
      })
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
        <Button onClick={testReg}>register</Button>
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
