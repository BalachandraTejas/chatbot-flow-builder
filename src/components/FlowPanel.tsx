import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  MarkerType,
  Connection,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
} from "reactflow";
import MessageNode from "./MessageNode";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "message",
    data: { label: `Text Message 1` },
    position: { x: 150, y: 25 },
  },
];

const initialEdges: Edge[] = [];

const customNodeTypes = { message: MessageNode };

let id = 2;
const getId = () => `${id++}`;

export default function FlowPanel({
  nodeText,
  setNodeText,
  selectedNode,
  setSelectedNode,
  setReadNodes,
  setReadEdges,
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)
      ),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleOnDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const id = getId();
      const newNode = {
        id: id,
        type,
        position,
        data: { label: `Text Message ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  useEffect(() => {
    if (selectedNode && selectedNode.id !== "") {
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedNode.id) {
          return { ...node, data: { label: nodeText } };
        }
        return node;
      });
      setNodes(updatedNodes);
      // setReadNodes(updatedNodes);
    } else {
      const deselectedNodes = nodes.map((node) => {
        return { ...node, selected: false };
      });
      setNodes(deselectedNodes);
      // setReadNodes(deselectedNodes);
    }

    // setReadEdges(edges);
  }, [nodeText, selectedNode]);

  const handleNodeClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    node: Node
  ) => {
    setSelectedNode(node);
    setNodeText(node.data.label);
  };

  useEffect(() => {
    setReadNodes(nodes);
    setReadEdges(edges);
  }, [nodes, edges]);

  return (
    <div className="react-flow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={customNodeTypes}
        onInit={setReactFlowInstance}
        onDrop={handleOnDrop}
        onDragOver={onDragOver}
        onNodeClick={handleNodeClick}
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
