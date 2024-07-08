import { Box, Typography } from "@mui/material";
import SideBar from "../../Component/SideBar";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs from "dayjs";


export default function PerformanceReportRoute(){
    const [dateFrom, setDateFrom] = useState(dayjs('2024-01-01'))
    const [dateTo, setDateTo] = useState(dayjs('2024-01-31'))


    return(
        <>
            <Box sx={{ display: 'flex' }}>
                <SideBar/>
                <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: "50px" }}>
                    <h3>Report : Route Performance</h3>
                    <Box>
                        <DatePicker
                            label="From"
                            value={dateFrom}
                            onChange={(val)=>setDateFrom(val)}
                            slotProps={{
                                textField: {
                                    helperText: dateFrom.toString()
                                }
                            }}                     
                        />
                        <DatePicker
                            label="To"
                            value={dateTo}
                            onChange={(val)=>setDateTo(val)}
                            slotProps={{
                                textField: {
                                    helperText: dateTo.toString()
                                }
                            }}                     
                        />
                    </Box>


                </Box>
            </Box>
        </>
    )
}