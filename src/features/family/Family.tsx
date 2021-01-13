import { Box, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

const FamilyDiagram: React.FC = () => {
    return (
        <React.Fragment>
            <canvas />       
        </React.Fragment>
    );
}

export const Family: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4">系図</Typography>
            <Paper><FamilyDiagram /></Paper>
        </Box>
    );
}
