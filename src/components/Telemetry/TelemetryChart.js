import React from "react";
import {
    Line,
    Bar,
    Doughnut,
    Pie,
    Radar,
    Polar
} from "react-chartjs-2";
import { Card, CardBody, CardTitle } from "reactstrap";
import { chartOptions } from "../../variables/charts";

const renderChartByType = (type, data, options) => {
    const chartProps = { data, options };

    switch (type) {
        case "bar":
            return <Bar {...chartProps} />;
        case "doughnut":
            return <Doughnut {...chartProps} />;
        case "pie":
            return <Pie {...chartProps} />;
        case "radar":
            return <Radar {...chartProps} />;
        case "polar":
            return <Polar {...chartProps} />;
        case "line":
        default:
            return <Line {...chartProps} />;
    }
};

const TelemetryChart = ({ title, data, label, type }) => {
    const labels = data.map((_, i) => `#${i + 1}`);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: data,
                backgroundColor:
                    type === "bar" ? "#2dce89" : "rgba(45, 206, 137, 0.1)",
                borderColor: "#2dce89",
                fill: type === "line" || type === "bar",
            },
        ],
    };

    const options = {
        ...chartOptions().defaults.global,
        maintainAspectRatio: false,
        scales:
            type === "bar" || type === "line"
                ? {
                    yAxes: [{ ticks: { beginAtZero: true } }],
                    xAxes: [{ display: false }],
                }
                : {},
    };

    return (
        <Card className="mb-4">
            <CardBody>
                <CardTitle tag="h5" className="text-muted">{title}</CardTitle>
                <div style={{ height: "200px" }}>
                    {renderChartByType(type, chartData, options)}
                </div>
            </CardBody>
        </Card>
    );
};

export default TelemetryChart;