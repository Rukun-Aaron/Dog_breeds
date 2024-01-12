import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudArrowUp, faXmark, faTrash, faFileCsv, faFileExcel,
} from '@fortawesome/free-solid-svg-icons';

const ImageUploadNew = () => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFile = useRef(null);
  const [images, setImages] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    inputFile.current.click();
  };

  return (
    <div className="w-full h-full flex justify-center overflow-x-hidden pt-4 pb-4">
      <div className="max-w-4xl xl:max-w-5xl w-11/12 flex flex-col items-center h-full gap-4">
        <h1 className="text-3xl font-bold underline p-4">
          Classify Your Dog!
        </h1>
        <h1 className="font-varela text-xl font-bold dark:text-neutral-100">Upload</h1>
        <h1 className="text-xl font-varela text-center dark:text-neutral-100">
          Drag and Drop or Browse to Upload Image
        </h1>
        <p className="text-gray-500 font-varela text-center dark:text-neutral-400">
          Upload unlimited images at once
        </p>
        <input
          alt="file"
          type="file"
          id="file"
          ref={inputFile}
          className="hidden"
          onChange={onFileChange}
          multiple
          accept="image/png, image/jpeg, image/webp"
        />
        <div
          className={`dark:border-neutral-100 transition-all cursor-pointer card w-full border-2 border-dashed rounded-lg border-gray-300 ${images.length > 0
            ? 'flex flex-col sm:flex-row justify-around items-center p-4'
            : 'aspect-video flex items-center justify-center p-4'
            } ${isDraggingOver ? 'bg-green-200 dark:bg-green-800' : 'bg-transparent'}`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="md:flex flex-col hidden">
          <FontAwesomeIcon className="text-primary" icon={faCloudArrowUp} size={'4x'} />
            <h2 className={`dark:text-neutral-100 text-lg font-varela ${images.length === 0 && 'mt-8'} text-center`}>
              Select a file or drag and drop here
            </h2>
            <p className="text-gray-500 mt-4 font-varela text-center dark:text-neutral-400">
              JPG, PNG, file size no more than 10MB
            </p>
          </div>
          {image && <img src={image} alt="Uploaded" className="max-w-full max-h-48 object-contain" />}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadNew;
