'use client';
import React, { useState } from 'react';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [bgRemovedImageUrl, setBgRemovedImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = (imageFile, maxWidth, maxHeight) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const { width, height } = img;
      let newWidth = width;
      let newHeight = height;
      if (width > maxWidth) {
        newWidth = maxWidth;
        newHeight = (height * maxWidth) / width;
      }
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = (width * maxHeight) / height;
      }
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      canvas.toBlob(resolve, 'image/jpeg');
    };
    img.src = URL.createObjectURL(imageFile);
  });
  
  const handleRemoveBackground = async () => {
    if (!selectedFile) return;
    try {
      setLoading(true);
      const resizedImage = await resizeImage(selectedFile, selectedFile.width, selectedFile.height);
      const formData = new FormData();
      formData.append('image_file', resizedImage, selectedFile.name);
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': 'fE7ByAj3rsC9MnuigmwGyuJ1',
        },
        body: formData,
      });
      if (!response.ok) {
        console.error('Error removing background:', response.statusText);
        return;
      }
      const result = await response.blob();
      setBgRemovedImageUrl(URL.createObjectURL(result));
    } catch (error) {
      console.error('Error removing background:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = bgRemovedImageUrl;
    downloadLink.download = 'background_removed_image.jpg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setImageUrl(null);
    setBgRemovedImageUrl(null);
  };
  
  return (
    <div className="mt-12 lg:mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <p className='text-sm lg:text-lg text-gray-700 mt-4'>
        Remove background from images of humans, animals, or objects and download high-resolution images.
      </p>
      <h2 className="text-lg text-violet-400 font-extrabold text-[25px] mt-6">Select a photo:</h2>
      <div className="border border-gray-300 rounded-lg shadow-sm mt-8 py-2 px-4 focus:outline-none focus:border-blue-400 items-center justify-center w-max">
        <input type="file" className="" onChange={handleFileChange} />
      </div>
      {selectedFile && (
        <div className='mt-6 lg:flex lg:items-center lg:space-x-8'>
          <div className='w-full lg:w-1/2'>
            <h3 className="text-lg lg:text-xl font-semibold">Selected Photo:</h3>
            <img src={imageUrl} alt="Selected" className="mt-2 lg:mt-4 w-full h-auto rounded-lg shadow-lg" />
            <button onClick={handleRemoveBackground} className="mt-4 lg:mt-6 py-2 px-4 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none ">Remove BG</button>
            {loading && <div className="mt-4 lg:mt-6 text-gray-600">Loading...</div>}
          </div>
          {bgRemovedImageUrl && (
            <div className='mt-6 lg:w-1/2'>
              <h3 className="text-lg lg:text-xl font-semibold">Background Removed:</h3>
              <img src={bgRemovedImageUrl} alt="Background Removed" className="mt-2 lg:mt-4 w-full h-auto rounded-lg shadow-lg" />
              <button onClick={handleDownload} className="mt-4 lg:mt-6 py-2 px-4 bg-green-800 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:bg-green-600">Download Image</button>
            </div>
          )}
        </div>
      )}
      {selectedFile && (
        <div className="mt-6">
          <button onClick={handleClear} className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Clear</button>
        </div>
      )}
    </div>
  );
};

export default Home;
