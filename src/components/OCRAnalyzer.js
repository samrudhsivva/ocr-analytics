import React from 'react';

const OCRAnalyzer = ({ onAnalyze }) => {
  return (
    <div>
      <h3>Step 2</h3>
      <button onClick={onAnalyze}>OCR Analyze</button>
    </div>
  );
};

export default OCRAnalyzer;
