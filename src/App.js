import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import OCRAnalyzer from './components/OCRAnalyzer';
import OutputDisplay from './components/OutputDisplay';
import './App.css';


function App() {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState(null);

  const handleAnalyze = async () => {
    if (!image) return alert("Upload an image first!");

    const response = await fetch(`${process.env.REACT_APP_AZURE_ENDPOINT}/vision/v3.2/ocr`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.REACT_APP_AZURE_KEY,
        'Content-Type': 'application/octet-stream'
      },
      body: image
    });

    const data = await response.json();
    const extractedText = data.regions.flatMap(r =>
      r.lines.map(line =>
        line.words.map(word => word.text).join(' ')
      )
    ).join('\n');

    const result = categorizeText(extractedText);
    setCategories(result);
  };

  const categorizeText = (text) => {
    const lines = text.split('\n');
    const result = { date: [], total: [], name: [], others: [] };

    for (let line of lines) {
      if (/\d{2}\/\d{2}\/\d{4}/.test(line)) result.date.push(line);
      else if (/\$\d+/.test(line)) result.total.push(line);
      else if (/invoice|company/i.test(line)) result.name.push(line);
      else result.others.push(line);
    }

    return result;
  };

  return (
    <div className="App">
      <h2>OCR Analytics Page</h2>
      <div className="step-container">
        <div className="step-box">
          <div className="step-title">Step 1</div>
          <ImageUploader onImageUpload={setImage} />
        </div>
        <div className="step-box">
          <div className="step-title">Step 2</div>
          <OCRAnalyzer onAnalyze={handleAnalyze} />
        </div>
        <div className="step-box">
          <div className="step-title">Step 3</div>
          {categories && <OutputDisplay categories={categories} />}
        </div>
      </div>
    </div>
  );
  
}

export default App;
