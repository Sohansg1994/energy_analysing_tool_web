import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Label, LabelList } from "recharts";
import axios from "axios";

export default function Graph(props) {
  const newdataSets = [
    [
      { name: "Ground Floor", totalUnits: 15 },
      { name: "First Floor", totalUnits: 40 },
    ],
    [
      { name: "Lights", totalUnits: 5 },
      { name: "Kitchen", totalUnits: 10 },
      { name: "BedRoom", totalUnits: 15 },
      { name: "TV Lobby", totalUnits: 25 },
    ],
    [
      { name: "Lights", totalUnits: 5 },
      { name: "Lights", totalUnits: 5 },
      { name: "Other", totalUnits: 5 },
      { name: "B1", totalUnits: 15 },
      { name: "B2", totalUnits: 25 },
    ],
  ];
  const [dataSets, setDataSets] = useState([]);
  const [projectLevelNumbers, setProjectLevelNumbers] = useState(0);
  const { projectId } = props;
  const { isCalculated } = props;
  const pieWidth = 100 / dataSets.length;
  const maxRadius = 200;
  const minRadius = 75;
  const radiusStep = (maxRadius - minRadius) / dataSets.length;

  const getGraphData = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await axios.get(
      `/playground/graphs/project?projectId=${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response.data.data.length);
    if (response.data.data.length === 2) {
      setProjectLevelNumbers(0);
    } else if (response.data.data.length === 3) {
      setProjectLevelNumbers(15);
    }

    setDataSets(response.data.data);
  };

  /* const calculateTotalUnits = () => {
    let count = 0;
    if (dataSets[0] != undefined) {
      dataSets[0].forEach((data) => (count += data.totalUnits));
      setProjectTotalUnits(count);
    }
  };*/

  useEffect(() => {
    getGraphData();
  }, [isCalculated]);

  return (
    <ResponsiveContainer
      width="100%"
      height={600}
      style={{ backgroundColor: "#000" }}
    >
      <PieChart>
        {dataSets.map((data, i) => (
          <Pie
            key={i}
            data={data}
            dataKey="totalUnits"
            cx={`${pieWidth + projectLevelNumbers}%`}
            cy="50%"
            innerRadius={minRadius + i * radiusStep}
            outerRadius={minRadius + (i + 1) * radiusStep}
            fill={`#${((i + 1) * 3).toString(16)}${((i + 1) * 5).toString(
              16
            )}${((i + 1) * 7).toString(16)}`}
            fillOpacity={0.7}
            label={({
              cx,
              cy,
              midAngle,
              outerRadius,
              name,
              unitPercentageOfProject,
            }) => {
              const radius = outerRadius + 25; // adjust the radius to move the label outside the graph
              const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
              const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);
              return (
                <text
                  x={x}
                  y={y}
                  fill="#000"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                  style={{ fontSize: 12 }}
                >
                  {`${name} ${unitPercentageOfProject.toFixed(2)}%`}
                </text>
              );
            }}
            labelLine={{ stroke: "#999", strokeWidth: 2, opacity: 1 }}
          />
        ))}
      </PieChart>
    </ResponsiveContainer>
  );
}
