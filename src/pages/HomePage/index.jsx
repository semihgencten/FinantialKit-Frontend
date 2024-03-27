import { Box } from "@mui/material";
import { FormattedMessage } from 'react-intl'

const HomePage = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <h2>
        <FormattedMessage id="homepage.title" />
      </h2>
    </Box>
  );
};

export default HomePage;
