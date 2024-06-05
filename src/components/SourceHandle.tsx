import React, { useMemo } from "react";
import { getConnectedEdges, Handle, useNodeId, useStore } from "reactflow";

const selector = (s: { nodeInternals: any; edges: any }) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const SourceHandle = (props) => {
  const { nodeInternals, edges } = useStore(selector);
  const nodeId = useNodeId();

  const isHandleConnectable = useMemo(() => {
    // if (typeof props.isConnectable === "function") {
    //   const node = nodeInternals.get(nodeId);
    //   const connectedEdges = getConnectedEdges([node], edges);

    //   return props.isConnectable({ node, connectedEdges });
    // }

    if (typeof props.isConnectable === "number") {
      const node = nodeInternals.get(nodeId);
      const connectedEdges = getConnectedEdges([node], edges);
      const filteredEdges = connectedEdges.filter(
        (edge) => edge.source === nodeId
      );

      return filteredEdges.length < props.isConnectable;
    }

    return props.isConnectable;
  }, [nodeInternals, edges, nodeId, props.isConnectable]);

  return <Handle {...props} isConnectable={isHandleConnectable}></Handle>;
};

export default SourceHandle;
