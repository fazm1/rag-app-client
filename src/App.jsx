import React, { useState } from "react";
import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./styles/app.css";

import { nodeTypes, useFlow } from "./flow";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    runFlow,
  } = useFlow();

  return (
    <div className={`app-container${sidebarOpen ? "" : " sidebar-collapsed"}`}>
      <div className={`sidebar${sidebarOpen ? "" : " collapsed"}`}>
       {!sidebarOpen ? <button
        display=""
          className="sidebar-toggle"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          ≡
        </button>: ""}
        {sidebarOpen && (
          <>
            <div className="sideHeader">
              <h4>Toolbox</h4> 
              
              <button
                className="sidebar-toggle"
                onClick={() => setSidebarOpen((open) => !open)}
                aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                ≡
              </button>
            </div>
            <p>Drag and drop nodes into the canvas</p>
            <button
              className="draggable-btn"
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("nodeType", "inputNode")
              }
            >
              Add Input
            </button>
            <button
              className="draggable-btn"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("nodeType", "ragNode")}
            >
              Add RAG
            </button>
            <button
              className="draggable-btn"
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("nodeType", "outputNode")
              }
            >
              Add Output
            </button>
            <hr />
            <button onClick={runFlow}>▶ Run Flow</button>
          </>
        )}
      </div>
      <div
        className="canvas-area"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const nodeType = e.dataTransfer.getData("nodeType");
          if (nodeType) {
            // Get bounding rect and mouse position
            const bounds = e.currentTarget.getBoundingClientRect();
            const position = {
              x: e.clientX - bounds.left,
              y: e.clientY - bounds.top,
            };
            addNode(nodeType, position);
          }
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
