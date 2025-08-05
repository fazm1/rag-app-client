import { useCallback, useState } from 'react';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
} from '@xyflow/react';

import InputNode from './components/InputNode';
import RagNode from './components/RagNode';
import OutputNode from './components/OutputNode';
import axios from 'axios';

export const nodeTypes = {
  inputNode: InputNode,
  ragNode: RagNode,
  outputNode: OutputNode,
};

export function useFlow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const reactFlowInstance = useReactFlow();
  const [flowState, setFlowState] = useState({ inputText: '', pdfFile: null, outputText: '' });

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
  }, []);

  const handleInputChange = (id, value) => {
    // update node data + state
    setFlowState((s) => ({ ...s, inputText: value }));
    setNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, value } } : n))
    );
  };

  const handleUpload = (id, file) => {
    setFlowState((s) => ({ ...s, pdfFile: file }));
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id
          ? { ...n, data: { ...n.data, filename: file.name } }
          : n
      )
    );
  };

  const addNode = (type, position) => {
    const id = `${type}-${Date.now()}`;
    const pos = position || { x: 50 + Math.random() * 200, y: 50 + Math.random() * 200 };
    const data = {};
    if (type === 'inputNode') data.value = flowState.inputText || '';
    if (type === 'ragNode') data.filename = flowState.pdfFile?.name || '';
    if (type === 'outputNode') data.output = flowState.outputText || '';
    data.onChange = handleInputChange;
    data.onUpload = handleUpload;

    setNodes((nds) => [...nds, { id, type, position: pos, data }]);
  };

  const runFlow = async () => {
    // Find nodes
    const ragNodes = nodes.filter(n => n.type === 'ragNode');
    const inputNodes = nodes.filter(n => n.type === 'inputNode');
    const outputNodes = nodes.filter(n => n.type === 'outputNode');

    // Only proceed if exactly one rag and one input node
    if (ragNodes.length !== 1 || inputNodes.length !== 1) {
      return alert('You must have exactly one RAG node and one Input node.');
    }

    // Find edges
    const ragNodeId = ragNodes[0].id;
    const inputNodeId = inputNodes[0].id;

    // Check if input is connected to rag
    const inputToRag = edges.some(
      e => (e.source === inputNodeId && e.target === ragNodeId)
    );
    if (!inputToRag) {
      return alert('Input node must be connected to the RAG node.');
    }

    // Check if output is connected to rag
    const outputConnected = outputNodes.some(outputNode =>
      edges.some(e => (e.source === ragNodeId && e.target === outputNode.id))
    );
    if (!outputConnected) {
      return alert('Output node must be connected to the RAG node.');
    }

    if (!flowState.inputText || !flowState.pdfFile) {
      return alert('Add input and upload PDF!');
    }
    const fd = new FormData();
    fd.append('query', flowState.inputText);
    fd.append('file', flowState.pdfFile);
    try {
      const res = await axios.post('http://localhost:3000/api/query', fd);
      const answer = res.data.answer;
      setFlowState((s) => ({ ...s, outputText: answer }));
      setNodes((nds) =>
        nds.map((n) =>
          n.type === 'outputNode' ? { ...n, data: { ...n.data, output: answer } } : n
        )
      );
    } catch {
      alert('Error running flow');
    }
  };

  return { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, runFlow };
}
