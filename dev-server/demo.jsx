import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {createElement} from "react";

import NodeCanvas from "../src/index";

// import graph from "./public/graph.json";

const graph = {
  nodes: [],
  edges: [],
};

function App() {
  const {nodes, edges} = graph;
  const bridge = {
    onClickCanvas(event, position, graphManager) {
      const node = graphManager.createNode({position});

      graphManager.selectedNodeIds = [node.id];
    },
    onClickPort(event, port, parentNode, graphManager) {
      const parentNodeElement = document.querySelector(
        `#Node-${parentNode.id}`
      );
      const edgesOut = graphManager
        .getEdgesByNodeId(parentNode.id)
        .filter(({from}) => from.nodeId === parentNode.id);

      const BCR = parentNodeElement.getBoundingClientRect();
      const initialPosition = graphManager.workspace.getCanvasPosition(BCR);
      const position = edgesOut.reduce(
        (acc, edge) => {
          const nodeElement = document.querySelector(`#Node-${edge.to.nodeId}`);
          const BCR = nodeElement.getBoundingClientRect();
          const position = graphManager.workspace.getCanvasPosition(BCR);
          if (position.y >= acc.y) {
            return {
              ...acc,
              y: position.y + BCR.height + 20,
            };
          }
          return acc;
        },
        {
          x: initialPosition.x + BCR.width + 50,
          y: initialPosition.y,
        }
      );

      const node = graphManager.createNode({position});

      graphManager.createEdge({
        from: {
          nodeId: parentNode.id,
          portId: port.id,
        },
        to: {
          nodeId: node.id,
          portId: node.inputPorts[0].id,
        },
      });
      graphManager.selectedNodeIds = [node.id];
    },
    onKeyPress(event, key, graphManager) {
      if (key === "Backspace" && graphManager.selectedNodeIds.length > 0) {
        graphManager.removeNodesByIds(graphManager.selectedNodeIds);
      }
    },
  };

  const theme = {
    workspace: {
      backgroundColor: "#222",
    },
    canvas: {
      boxShadow: "0 0 0 1px rgba(255,255,255,0.2)",
      backgroundColor: "#333",
      backgroundImage: [
        "radial-gradient(rgba(255,255,255,0.2)",
        "rgba(255,255,255,0.2) 1.5px,transparent 1.5px)",
      ].join(","),
      backgroundPosition: "-10px -10px",
    },
  };

  const options = {
    gridSize: 20,
  };

  return (
    <NodeCanvas
      nodes={nodes}
      edges={edges}
      theme={theme}
      bridge={bridge}
      options={options}
    />
  );
}

ReactDOM.render(createElement(App), document.getElementById("app"));
