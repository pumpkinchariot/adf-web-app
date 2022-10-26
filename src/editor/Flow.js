import React from 'react';
import { useState, useEffect } from 'react';
import "./Editor.css";

function Flow({ nodes, edges, onNodesChange, onEdgesChange, onConnect }) {
    return (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    );
  }

export default Flow;