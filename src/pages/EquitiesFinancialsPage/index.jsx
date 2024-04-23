/*import { Box } from '@mui/material'
import TabsLayout from '@/pages/EquitiesPage';

const EquitiesFinancialsPage = () => {

  return (
    <TabsLayout>
        <Box sx={{ textAlign: "center" }}>
        <h2>Financials Page</h2>;
        </Box>
    </TabsLayout>
  );
};

export default EquitiesFinancialsPage;
*/
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types'; // Import PropTypes
import { Box } from '@mui/material';


const FinancialsTabsLayout = ({ children }) => {
    const navigate = useNavigate(); 
    const [value, setValue] = useState(getTabValueFromPath(location.pathname));

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch(newValue) {
            case 'one':
                navigate('/equities/financials/profile');
                break;
            case 'two':
                navigate('/equities/financials/dividends');
                break;
            case 'three':
                navigate('/equities/financials/statements');
                break;
            case 'four':
                navigate('/equities/financials/risk');
                break;
            case 'five':
                navigate('/equities/financials/statistics');
                break;
            case 'six':
                navigate('/equities/financials/holders');
                break;
            default:

                break;
        }
    };

    return (
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
                sx={{ transition: '0.3s' }} 
            >
                <Tab value="one" label="Profile" />
                <Tab value="two" label="Dividends" />
                <Tab value="three" label="Statements" />
                <Tab value="four" label="Risk" />
                <Tab value="five" label="Statistic" />
                <Tab value="six" label="Holders" />
            </Tabs>
            {children}
        </div>
    );
};
const getTabValueFromPath = (path) => {
    switch(path) {
        case '/equities/financials/profile':
            return 'one';
        case '/equities/financials/dividends':
            return 'two';
        case '/equities/financials/statements':
            return 'three';
        case '/equities/financials/risk':
            return 'four';
        case '/equities/financials/statistics':
            return 'five';
        case '/equities/financials/holders':
            return 'six';
        default:
            return 'one';
    }
};
FinancialsTabsLayout.propTypes = {
    children: PropTypes.node // Validate children prop as a React node
};
export default FinancialsTabsLayout;
