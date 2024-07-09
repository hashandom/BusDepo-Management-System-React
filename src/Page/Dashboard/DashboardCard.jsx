import { Box, Card, Paper, Typography } from "@mui/material";

export default function DashboardCard({cardTitle, cardValue}) {
    return(
        <Card
            sx={{
                padding:'10px',
                margin:'20px',
                minWidth:'150px',
                borderRadius:'10px'
            }}
        >
            <Typography fontSize={24} align="center">{cardTitle}</Typography>
            <Typography
                fontSize={48}
                align="center"                                
            >
                {String(cardValue).padStart(2, '0')}
            </Typography>
        </Card>
    )
    
}