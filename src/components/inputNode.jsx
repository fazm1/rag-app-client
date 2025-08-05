import React, { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

export default function InputNode({ id, data, isConnectable }) {
  const onChange = useCallback((e) => {
    data.onChange(id, e.target.value);
  }, [data, id]);

  return (
    <div style={{ padding: 10, border: '1px solid #666', background: '#fff', borderRadius: 8, width: 200 }}>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
      <strong>Input</strong>
      <textarea
        className="nodrag"
        rows={4}
        style={{ width: '100%', marginTop: 6 }}
        placeholder="Enter question..."
        defaultValue={data.value}
        onChange={onChange}
      />
    </div>
  );
}
