import React from 'react';
import { Handle, Position } from '@xyflow/react';

export default function OutputNode({ data, isConnectable }) {
  return (
    <div style={{ padding: 10, border: '1px solid #666', background: '#efe', borderRadius: 8, width: 240 }}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <strong>Output</strong>
      <div style={{ marginTop: 6, fontSize: 14, whiteSpace: 'pre-wrap' }}>
        {data.output || 'Run to display answer'}
      </div>
    </div>
  );
}
