import React, { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Ellipsis } from 'lucide-react';

export default function RagNode({ id, data, isConnectable }) {
  const onUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) data.onUpload(id, file);
  }, [data, id]);

  return (
    <div style={{ padding: 10, border: '1px solid #666', background: '#eef', borderRadius: 8, width: 220, overflow: "hidden", textOverflow: "Ellipsis" }}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
      <strong>RAG Node</strong>
      <input type="file" accept="application/pdf" className="nodrag" onChange={onUpload} style={{ marginTop: 8 }} />
      {data.filename && <div style={{ fontSize: 12, marginTop: 4  }}>Uploaded: {data.filename}</div>}
    </div>
  );
}
