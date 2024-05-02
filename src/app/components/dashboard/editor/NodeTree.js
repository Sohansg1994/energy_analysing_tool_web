import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNodeStore } from '../../../util/store';

const treeContainerStyle = {
  p: 2,
  m: 0, mb: 2,
  border: "1px solid #ccc",
  borderRadius: "4px"
}

const convertToTreeNode = (data) => {
  if (data?.frontEndId && data?.name) {
    let childNodes = [];
    if (data.children?.length) {
      childNodes = data.children.map((childData) => convertToTreeNode(childData));
    }
    return {
      id: data.frontEndId,
      label: data.name,
      children: childNodes,
      details: data
    };
  }
  return null;
}

const getNodeFromId = (node, frontendId) => {
  if (node?.frontEndId == frontendId) {
    return node;
  } else if (node?.children) {
    for (const i in node.children) {
      const child = node.children[i];
      const selectedNode = getNodeFromId(child, frontendId);
      if (selectedNode) {
        return selectedNode;
      }
    }
  }
}


function NodeTree({ projectId }) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [nodes, setNodes] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const setSelectedNode = useNodeStore((state) => state.setSelectedNode);

  const convetToTreeStructure = (root) => {
    const treeStructure = [];
    const rootNode = convertToTreeNode(root);
    if (rootNode) {
      setSelectedNode(rootNode.details)
      treeStructure.push(rootNode)
    }
    // else default root node ???
    return treeStructure
  }

  const getProjectNodes = async () => {
    await axios.get(`/project?projectId=${projectId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (response.status === 200 && response.data.root) {
        setNodes(response.data.root);
        setTreeData(convetToTreeStructure(response.data.root));
      }
    }).catch((error) => {
      console.log(error);
      navigate("/error");
    });
  }

  useEffect(() => {
    getProjectNodes();
  }, []);

  const handleItemSelection = (event, itemId, isSelected) => {
    if (isSelected) {
      const selectedNode = getNodeFromId(nodes, itemId);
      setSelectedNode(selectedNode);
    }
  };

  return (
    <Container component={Paper} disableGutters sx={treeContainerStyle}>
      <Grid container spacing={0}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography>
            Project tree
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <RichTreeView
            items={treeData}
            onItemSelectionToggle={handleItemSelection}
            slots={{
              expandIcon: AddBoxOutlinedIcon,
              collapseIcon: IndeterminateCheckBoxOutlinedIcon
            }} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default NodeTree;