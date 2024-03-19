import { Box } from '@mui/material'
import TabsLayout from '@/pages/EquitiesPage';

const EquitiesOverviewPage = () => {
  return (
    <TabsLayout>
        <Box sx={{ textAlign: "center" }}>
            <h2>Overview Page</h2>;
        </Box>
    </TabsLayout>
  );
};

export default EquitiesOverviewPage;