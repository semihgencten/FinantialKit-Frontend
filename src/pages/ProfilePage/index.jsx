import { Label } from "@mui/icons-material";
import { Box, Grid, Container, Input } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();

  let { user, status, error, isAuth } = useSelector((state) => state.user);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Input placeholder={user}> </Input>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
