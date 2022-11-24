import React from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { ISuccessResp } from "../../../interfaces/graph.interface";

interface Props {
  graphData: Array<ISuccessResp>;
}

const ResponseGraph: React.FC<Props> = ({ graphData }) => {
  return (
    <LineChart
      width={730}
      height={250}
      data={graphData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="4 4" />
      <XAxis />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="top" />
      <Line type="monotone" dataKey="response_time" stroke="#8884d8" />
    </LineChart>
  );
};

export default ResponseGraph;
