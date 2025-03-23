import React, { useState } from 'react';

const ImageUploader = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onImageUpload(file);
  };

  return (
    <div>
      <h3>Step 1</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Selected" style={{ width: 200, marginTop: 10 }} />}
    </div>
  );
};

export default ImageUploader;
