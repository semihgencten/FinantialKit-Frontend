import { Box, Grid } from '@mui/material'
import TabsLayout from '@/pages/EquitiesPage';
import { Graph } from '@/components/Graph';

const EquitiesOverviewPage = () => {
  return (
    <TabsLayout>
        <Box sx={{ textAlign: "center" }}>
            <h2>Overview Page</h2>
            <Grid container justifyContent="center" alignItems="center">
                <Graph />
            </Grid>
        </Box>
    </TabsLayout>
  );
};

export default EquitiesOverviewPage;