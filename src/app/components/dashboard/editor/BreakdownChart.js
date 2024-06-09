import { Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Plot from 'react-plotly.js';
import { useNavigate, useParams } from "react-router-dom";
import ResizeObserver from 'resize-observer-polyfill';
import { COLORS, PATHS } from "../../../util/CommonUtil";
import useAxiosPrivate from "../../../util/useAxiosPrivate";


const convertData = (rootNode) => {
  const labels = []
  const parents = []
  const values = []

  flattenData(rootNode, labels, parents, values);

  return [{
    type: "sunburst",
    labels: labels,
    parents: parents,
    values: values,
    outsidetextfont: { size: 20, color: "#377eb8" },
    leaf: { opacity: 0.4 },
    marker: { line: { width: 2 } },
    branchvalues: "total"
  }];
}

const flattenData = (node, labels, parents, values) => {
  const parentName = node.parentName ? node.parentName : "";
  parents.push(parentName);
  values.push(node.totalUnits);
  labels.push(node.name);

  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      flattenData(child, labels, parents, values);
    });
  }
}

function BreakdownChart() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState(null);

  const boxRef = useRef(null);
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });


  const getGraphData = async () => {
    await axiosPrivate.get(`playground/graph?projectId=${projectId}`)
      .then((response) => {
        if (response.status === 200 && response?.data?.data[0]) {
          const convertedResult = convertData(response.data.data[0]);
          setData(convertedResult);
        }
      }).catch((error) => {
        if (error.status === 403 || error.status === 401) {
          navigate(PATHS.SIGN_IN);
        } else {
          navigate(PATHS.ERROR, {
            state: {
              action: "Doing tariff calculations",
              code: error.code,
              message: error.message,
              stack: error.stack
            }
          });
        }
      });
  }

  const handleResize = (entries) => {
    for (let entry of entries) {
      if (entry.target === boxRef.current) {
        setBoxSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    }
  };


  useEffect(() => {
    getGraphData();

    const resizeObserver = new ResizeObserver(handleResize);
    if (boxRef.current) {
      resizeObserver.observe(boxRef.current);
    }
    return () => {
      if (boxRef.current) {
        resizeObserver.unobserve(boxRef.current);
      }
    };
  }, []);


  return (
    <Box component={Paper} sx={{ p: 2, mb: 2, backgroundColor: COLORS.LIGHT_GRAY }}>
      {Boolean(data) && (
        <Plot
          data={data}
          layout={{
            width: boxSize.width,
            height: boxSize.height,
            margin: { t: 0, l: 0, r: 0, b: 0 },
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </Box>
  )
}

export default BreakdownChart;