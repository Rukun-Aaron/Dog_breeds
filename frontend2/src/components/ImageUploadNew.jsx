import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import {
  getPredictions, getBreedInfo
} from '../services/apiService';
const ImageUploadNew = () => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFile = useRef(null);
  const [images, setImages] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [breedInfo, setBreedInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPredictionIndex, setSelectedPredictionIndex] = useState(null);

  useEffect(() => {
    console.log('Updated Predictions:', predictions);
  }, [predictions]);

  useEffect(() => {
    console.log('Updated beed info:', breedInfo);
  }, [breedInfo]);
  
  const onFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      setLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const classifyResponse = await getPredictions(formData);

        if (classifyResponse.ok) {
          const result = await classifyResponse.json();
          setPredictions((prevPredictions) => [...prevPredictions, result]);
          // console.log('Predictions inside onFileChange:', predictions);
          try {
            const getDogInfoResponse = await getBreedInfo(result.label);
            if (getDogInfoResponse.ok) {
              const dogInfo = await getDogInfoResponse.json();
              // Use dogInfo as needed (e.g., update state)
              setBreedInfo((prevInfo) => [...prevInfo, dogInfo]);
              // console.log('Dog Info:', dogInfo);
            } else {
              console.error('Error in /get_dog_info request:', getDogInfoResponse.statusText);
              setBreedInfo((prevInfo) => [...prevInfo, `No information available for ${result.label}`]);
            }
          }
          catch (error) {
            console.error('Error in fetch:', error);
            setBreedInfo((prevInfo) => [...prevInfo, `No information available for ${result.label}`]);
          }

        } else {
          console.error('Error in /classify request:', classifyResponse.statusText);
        }
      } catch (error) {
        console.error('Error in fetch:', error);
      } finally {
        setLoading(false);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);

      setImages((prevImages) => [...prevImages, file]);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0];
      setSelectedFile(file);

      setLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const classifyResponse = await getPredictions(formData);

        if (classifyResponse.ok) {
          const result = await classifyResponse.json();
          setPredictions((prevPredictions) => [...prevPredictions, result]);
          try {
            const getDogInfoResponse = await getBreedInfo(result.label);
            if (getDogInfoResponse.ok) {
              const dogInfo = await getDogInfoResponse.json();
              // Use dogInfo as needed (e.g., update state)
              setBreedInfo((prevInfo) => [...prevInfo, dogInfo]);
              console.log('Dog Info:', dogInfo);
            } else {
              console.error('Error in /get_dog_info request:', getDogInfoResponse.statusText);
              setBreedInfo((prevInfo) => [...prevInfo, `No information available for ${result.label}`]);
            }
          }
          catch (error) {
            console.error('Error in fetch:', error);
            setBreedInfo((prevInfo) => [...prevInfo, `No information available for ${result.label}`]);
          }
        } else {
          console.error('Error in /classify request:', classifyResponse.statusText);
        }
      } catch (error) {
        console.error('Error in fetch:', error);
      } finally {
        setLoading(false);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);

      setImages((prevImages) => [...prevImages, file]);
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

  const handleClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handleModalClick = (index) => {
    setShowModal(true);
    setSelectedPredictionIndex(index);
  };

  return (
    <div className="w-full h-full flex justify-center overflow-x-hidden pt-4 pb-4">
      <div className="max-w-4xl xl:max-w-5xl w-11/12 flex flex-col items-center h-full gap-4">
        <h1 className="text-3xl font-bold underline p-4">Classify Your Dog!</h1>
        <h1 className="text-xl font-varela text-center dark:text-neutral-100">
          Drag and Drop or Browse to Upload Image
        </h1>
        <p className="text-gray-500 font-varela text-center dark:text-neutral-400 pb-4">
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
          <div className={images.length > 0 ? 'flex flex-row' : 'md:flex flex-col hidden'}>
            <FontAwesomeIcon
              className={images.length > 0 ? 'text-primary p-4' : 'text-primary'}
              icon={faCloudArrowUp}
              size={images.length > 0 ? '3x' : '5x'}
            />
            <div className="flex flex-col items-center justify-center">
              <h2
                className={`dark:text-neutral-100 text-lg font-varela ${images.length === 0 && 'mt-8'} text-center`}
              >
                Select a file or drag and drop here
              </h2>
              <p className="text-gray-500 mt-4 font-varela text-center dark:text-neutral-400">
                JPG, PNG, file size no more than 10MB
              </p>
            </div>
          </div>
        </div>
        {images.length > 0 && (
          <div className="mt-4 w-full flex flex-col gap-4">
            <h2 className="text-lg dark:text-neutral-100">Files Added</h2>
            {images.map((uploadedImage, index) => (
              <div
                key={index}
                className="flex w-full items-center p-4 gap-4 rounded-xl transition-all cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 animate-ease-in-out animate-jump animate-once animate-duration-700"
                onClick={() => handleModalClick(index)}
              >
                <div className="w-32 h-16 flex items-center justify-center">
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    alt={`Selected ${index + 1}`}
                    className="max-w-32 max-h-16 rounded-md"
                  />
                </div>
                <div className="dark:text-neutral-100 truncate mr-auto">
                  {uploadedImage.name}
                </div>
                <div className="text-gray-500">
                  {formatFileSize(uploadedImage.size)}
                </div>
              </div>
            ))}
          </div>
        )}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md">
              <h2 className="text-lg font-bold mb-4">Prediction</h2>
              {selectedPredictionIndex !== null && (
                <div className="text-gray-700">
                  <p>
                    Predicted breed: {predictions[selectedPredictionIndex].label}
                  </p>
                  <p>
                    {breedInfo[selectedPredictionIndex][0].drooling}
                  </p>
                  <p>
                    {predictions[selectedPredictionIndex].score &&
                      `Confidence score: ${predictions[selectedPredictionIndex].score * 100}%`}
                  </p>
                </div>
              )}
              <button
                className="mt-4 p-2 bg-primary rounded-md"
                onClick={() => {
                  setShowModal(false);
                  setSelectedPredictionIndex(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Function to format file size
const formatFileSize = (size) => {
  const kbSize = size / 1024;
  if (kbSize < 1024) {
    return `${kbSize.toFixed(2)} KB`;
  } else {
    const mbSize = kbSize / 1024;
    return `${mbSize.toFixed(2)} MB`;
  }
};

export default ImageUploadNew;
