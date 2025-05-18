import {Card, CardBody, CardTitle, Progress} from "reactstrap";
import React from "react";

const TelemetryStat = ({ title, value, unit = "", progress = null }) => (
    <Card className="mb-4">
        <CardBody>
            <CardTitle tag="h5" className="text-muted">{title}</CardTitle>
            <h2 className="mb-0">{value !== null && value !== undefined ? `${value} ${unit}` : "--"}</h2>
            {progress !== null && <Progress value={progress} className="mt-2" />}
        </CardBody>
    </Card>
);

export default TelemetryStat;