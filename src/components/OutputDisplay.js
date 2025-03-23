import React from 'react';

const OutputDisplay = ({ categories }) => {
  return (
    <div>
      <h3>Step 3</h3>
      <div style={{ border: '1px solid #ccc', padding: 10 }}>
        <strong>OCR Categories Output</strong>
        <pre>{JSON.stringify(categories, null, 2)}</pre>
      </div>
    </div>
  );
};

export default OutputDisplay;
