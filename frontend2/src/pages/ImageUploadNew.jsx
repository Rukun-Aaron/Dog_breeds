import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';
import Navbar from '../components/NavBar';
import {
  getPredictions, getBreedInfo, getAllBreedNames
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

  console.log(breedInfo)


  useEffect(() => {
    // Fetch breed data when the component mounts
    const fetchData = async () => {
      try {
        const response = await getAllBreedNames();
        const data = await response.json();
        const formattedData = data.map((item, index) => ({
          value: `value${index}`, // You can adjust the value as needed
          label: item[0],
        }));
        setBreeds(formattedData);
      } catch (error) {
        console.error('Error fetching breed data:', error);
      }
    };

    fetchData();
  }, []);


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
  
    setSelectedPredictionIndex(null);
  }


  return (
    <div className="bg-[#F5F1FF] w-full h-full flex flex-col items-center pb-4 pt-4"
    style={{
      backgroundImage: `url('/mirror3.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    }}
    >
      <Navbar/>
      <div className="bg-white max-w-4xl xl:max-w-5xl w-11/12 flex flex-col items-center h-full gap-1 rounded-3xl mt-20 shadow dark:shadow-xl">
        <h1 className="text-md md:text-2xl font-bold pt-10">Classify Your Dog</h1>
        <h1 className="text-sm md:text-xl text-center dark:text-neutral-100">
          Drag and Drop or Browse to Upload Image
        </h1>
        <p className="text-gray-500 text-center dark:text-neutral-400 pb-4">
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
          className={`bg-[#E4D9FF] h-full mb-12 dark:border-neutral-100 transition-all cursor-pointer card w-10/12 border-2 border-dashed rounded-3xl border-[#694DDB] ${images.length > 0
            ? 'flex flex-col sm:flex-row justify-around items-center p-4'
            : 'aspect-video flex items-center justify-center p-4'
            } ${isDraggingOver ? 'bg-[#E4D9FF]' : 'bg-[#F5F1FF]'}`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={images.length > 0 ? 'flex flex-row' : 'md:items-center flex flex-col'}>
            <FontAwesomeIcon
              className={images.length > 0 ? 'text-[#694DDB] p-4' : 'text-[#694DDB] text-6xl md:text-8xl'}
              icon={faCloudArrowUp}
              size={images.length > 0 ? '3x' : '5x'}
            />
            <div className="flex flex-col items-center justify-center">
              <h2
                className={`dark:text-neutral-100 md:text-lg text-md ${images.length === 0 && 'mt-8'} text-center`}
              >
                Select a file or drag and drop here
              </h2>
              <p className="text-gray-500 mt-2 text-center text-xs md:text-sm dark:text-neutral-400">
                JPG, PNG, file size no more than 10MB
              </p>
            </div>
          </div>
        </div>
        {images.length > 0 && (
          <div className="mt-4 w-full flex flex-col gap-2 my-8 px-8">
            <h2 className="text-lg dark:text-neutral-100 px-8">Files Added</h2>
            {images.map((uploadedImage, index) => (
              <div
                key={index}
                className="flex w-full items-center p-4 gap-4 rounded-xl transition-all cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 animate-ease-in-out animate-jump animate-once animate-duration-700 relative"
                onClick={() => handleModalClick(index)}
              >
                {isLoading && selectedFile === uploadedImage && (
                  <div className="absolute inset-0 flex items-center justify-end rounded-xl pr-40">
                    <div className="w-6 h-6 border-t-2 border-[#694DDB] border-solid rounded-full animate-spin ml-auto"></div>
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
                  <div className="text-[#694DDB] rounded-2xl border border-[#694DDB] pl-1 pr-1">
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
          breeds={breeds}
          breedInfo={breedInfo}
          images={images}
        
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