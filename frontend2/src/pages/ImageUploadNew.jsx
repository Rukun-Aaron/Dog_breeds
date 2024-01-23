import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';

import {
  getPredictions, getBreedInfo, getAllBreedInfo
} from '../services/apiService';


const ImageUploadNew = () => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFile = useRef(null);
  const [images, setImages] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [breedInfo, setBreedInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPredictionIndex, setSelectedPredictionIndex] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [selectedBreedInfo, setSelectedBreedInfo] = useState([]);
  const [selectedBreedImage, setSelectedBreedImage] = useState(null);
  const [datasetsList, setDatasetsList] = useState([]);


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch breed data when the component mounts
    const fetchData = async () => {
      try {
        const response = await getAllBreedInfo();
        const data = await response.json();
        setBreeds(data);
      } catch (error) {
        console.error('Error fetching breed data:', error);
      }
    };

    fetchData();
  }, []);


  const handleBreedSelect = async (breed) => {
    // Update the selected breed state
    setSelectedBreed(breed);
    try {
      const response = await getBreedInfo(breed);
      const data = await response.json();
      setSelectedBreedImage(data[0].image_link);
      setSelectedBreedInfo(data);

      // console.log(selectedBreedInfo);
    } catch (error) {
      console.error('Error fetching selected breed info:', error);
    }
    setIsDropdownOpen(false);

  };

  useEffect(() => {
    // This code will be executed when selectedBreedInfo changes
    console.log('Selected Breed Info:', selectedBreedInfo);

    if (selectedBreedInfo.length > 0) {
      const newDataset = {
        label: `${selectedBreed}: Score out of 5`,
        data: [
          selectedBreedInfo[0].good_with_children,
          selectedBreedInfo[0].good_with_other_dogs,
          selectedBreedInfo[0].shedding,
          selectedBreedInfo[0].grooming,
          selectedBreedInfo[0].drooling,
          selectedBreedInfo[0].coat_length,

          selectedBreedInfo[0].playfulness,
          selectedBreedInfo[0].protectiveness,
          selectedBreedInfo[0].trainability,
          selectedBreedInfo[0].energy,
          selectedBreedInfo[0].barking,
          selectedBreedInfo[0].good_with_strangers,
        ],
        backgroundColor: 'rgba(255, 107, 168, 0.3)',
        borderColor: 'black',
        borderWidth: 1,
      };
      const updatedDatasets = [newDataset];
      setDatasetsList(updatedDatasets);
      console.log(updatedDatasets);
    }
  }, [selectedBreedInfo]);
  const toggleDropdown = () => {
    // Toggle the dropdown state
    setIsDropdownOpen(!isDropdownOpen);

    // console.log(isDropdownOpen);
  };
  const onFileChange = async (event) => {
    const file = event.target.files[0];

    setImages((prevImages) => [...prevImages, file]);
    setSelectedFile(file);
    if (file) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const classifyResponse = await getPredictions(formData);
        if (classifyResponse.ok) {
          const result = await classifyResponse.json();
          setPredictions((prevPredictions) => [...prevPredictions, result]);

          const breedInfoResponse = await getBreedInfo(result.label);

          if (breedInfoResponse.ok) {
            const result = await breedInfoResponse.json();
            setBreedInfo((prevBreedInfo) => [...prevBreedInfo, result]);
          }
          else {
            console.error('Error in /get_dog_info request:', breedInfoResponse.statusText);
          }
        }
        else {
          console.error('Error in /classify request:', classifyResponse.statusText);
        }
      }
      catch (error) {
        console.error('Error in fetch:', error);
      }
      finally {
        setIsLoading(false);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0];
      setImages((prevImages) => [...prevImages, file]);
      setSelectedFile(file);

      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const classifyResponse = await getPredictions(formData);
        if (classifyResponse.ok) {
          const result = await classifyResponse.json();
          setPredictions((prevPredictions) => [...prevPredictions, result]);
          const breedInfoResponse = await getBreedInfo(result.label);

          if (breedInfoResponse.ok) {
            const result = await breedInfoResponse.json();
            setBreedInfo((prevBreedInfo) => [...prevBreedInfo, result]);
          }
          else {
            console.error('Error in /get_dog_info request:', breedInfoResponse.statusText);
          }
        }
        else {
          console.error('Error in /classify request:', classifyResponse.statusText);
        }
      }
      catch (error) {
        console.error('Error in fetch:', error);
      }
      finally {
        setIsLoading(false);
      }

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

  const handleClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handleModalClick = (index) => {
    setShowModal(true);
    setSelectedPredictionIndex(index);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedBreed(null);
    setSelectedBreedInfo([]);
    setSelectedBreedImage(null);
    setDatasetsList([]);
    setSelectedPredictionIndex(null);
  }
  return (
    <div className="w-full h-full flex justify-center overflow-x-hidden pt-24 pb-4">
      <div className="max-w-4xl xl:max-w-5xl w-11/12 flex flex-col items-center h-full gap-1">
        <h1 className="text-2xl font-bold underline p-1">Classify Your Dog</h1>
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
              className={images.length > 0 ? 'text-blue-400 opacity-90 p-4' : 'text-blue-400 opacity-90'}
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
                className="flex w-full items-center p-4 gap-4 rounded-xl transition-all cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 animate-ease-in-out animate-jump animate-once animate-duration-700 relative"
                onClick={() => handleModalClick(index)}
              >
                {isLoading && selectedFile === uploadedImage && (
                  <div className="absolute inset-0 flex items-center justify-end rounded-xl pr-40">
                    <div className="w-6 h-6 border-t-2 border-primary border-solid rounded-full animate-spin ml-auto"></div>
                  </div>
                )}
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
                {predictions.length > 0 && predictions[index] && (
                  <div className="text-primary rounded-2xl border border-primary pl-1 pr-1">
                    {predictions[index].label} {(predictions[index].score * 100).toFixed(2)}%
                  </div>
                )}
                <div className="text-gray-500">
                  {formatFileSize(uploadedImage.size)}
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal 
          showModal={showModal}
          handleModalClose={handleModalClose}
          predictions={predictions}
          selectedPredictionIndex={selectedPredictionIndex}
          toggleDropdown={toggleDropdown}
          selectedBreed={selectedBreed}
          isDropdownOpen={isDropdownOpen}
          breeds={breeds}
          breedInfo={breedInfo}
          images={images}
          selectedBreedImage={selectedBreedImage}
          selectedBreedInfo={selectedBreedInfo}
          datasetsList={datasetsList}
          handleBreedSelect={handleBreedSelect}
        />

      </div>
    </div >
  );
};

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