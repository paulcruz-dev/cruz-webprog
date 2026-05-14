import React from "react";
import { Typography, Stack } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";

function ReportsPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <Stack spacing={4}>
        <BarChart
          xAxis={[{ scaleType: "band", data: ["Jan", "Feb", "Mar", "Apr"] }]}
          series={[
            { data: [4, 7, 3, 5], label: "Users" },
            { data: [2, 5, 6, 4], label: "Reports" },
          ]}
          height={300}
        />

        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 40, label: "Desktop" },
                { id: 1, value: 30, label: "Mobile" },
                { id: 2, value: 20, label: "Tablet" },
              ],
            },
          ]}
          height={250}
        />
      </Stack>
    </>
  );
}

export default ReportsPage;