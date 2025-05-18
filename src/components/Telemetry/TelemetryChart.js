import {chartOptions} from "../../variables/charts";
import {Card, CardBody, CardTitle} from "reactstrap";
import {Line} from "react-chartjs-2";
import React from "react";

const TelemetryChart = ({ title, data, label }) => {
    const chartData = {
        labels: data.map((_, i) => i.toString()),
        datasets: [
            {
                label: label,
                data: data,
                borderColor: "#2dce89",
                backgroundColor: "rgba(45, 206, 137, 0.1)",
                fill: true,
            },
        ],
    };

    const options = {
        ...chartOptions().defaults.global,
        scales: {
            yAxes: [{ ticks: { beginAtZero: true } }],
            xAxes: [{ display: false }],
        },
        maintainAspectRatio: false,
    };

    return (
        <Card className="mb-4">
            <CardBody>
                <CardTitle tag="h5" className="text-muted">{title}</CardTitle>
                <div style={{ height: "200px" }}>
                    <Line data={chartData} options={options} />
                </div>
            </CardBody>
        </Card>
    );
};

export default TelemetryChart;