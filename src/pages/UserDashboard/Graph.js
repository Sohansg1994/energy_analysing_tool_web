import React, {useEffect, useState} from "react";
import {Pie, PieChart, ResponsiveContainer} from "recharts";
import axios from "axios";

export default function Graph(props) {
  const [dataSets, setDataSets] = useState([]);
  const {projectId} = props;
  const {isCalculated} = props;
  const pieWidth = 100 / dataSets.length;
  const maxRadius = 225;
  const minRadius = 100;
  const radiusStep = (maxRadius - minRadius) / dataSets.length;
  
  const getGraphData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      `http://localhost:8080/playground/graphs/project?projectId=${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setDataSets(response.data.data);
  };
  
  
  useEffect(() => {
    getGraphData();
  }, [isCalculated]);
  
  return (
    <ResponsiveContainer
      width="100%"
      height={600}
      style={{backgroundColor: "#000"}}
    >
      <PieChart>
        {dataSets.map((data, i) => (
          <Pie
            key={i}
            data={data}
            dataKey="totalUnits"
            cx={`${pieWidth + 15}%`}
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
                  style={{fontSize: 14}}
                >
                  {`${name} ${unitPercentageOfProject.toFixed(2)}%`}
                </text>
              );
            }}
            labelLine={{stroke: "#999", strokeWidth: 2, opacity: 1}}
          />
        ))}
      </PieChart>
    </ResponsiveContainer>
  );
}
