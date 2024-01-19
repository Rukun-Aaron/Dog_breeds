import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  getPredictions, getBreedInfo, getAllBreedInfo
} from '../services/apiService';
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale,
  registerables
} from "chart.js";

import { Radar, Bar, Chart } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  RadialLinearScale,
  CategoryScale,
  ...registerables
)

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
  const [datasetsList, setDatasetsList] = useState([]);


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // useEffect(() => {
  //   console.log('Selected breed:', selectedBreed);
  // }, selectedBreed);

  // useEffect(() => {
  //   console.log('Updated beed info:', breedInfo);
  // }, [breedInfo]);

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
      setSelectedBreedInfo(data);
      console.log(data);
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
        label: 'Score out of 5',
        data: [
          selectedBreedInfo[0].good_with_children,
          selectedBreedInfo[0].good_with_other_dogs,
          selectedBreedInfo[0].shedding,
          selectedBreedInfo[0].grooming,
          selectedBreedInfo[0].drooling,
          selectedBreedInfo[0].coat_length,
          selectedBreedInfo[0].good_with_strangers,
          selectedBreedInfo[0].playfulness,
          selectedBreedInfo[0].protectiveness,
          selectedBreedInfo[0].trainability,
          selectedBreedInfo[0].energy,
          selectedBreedInfo[0].barking,
        ],
        backgroundColor: 'rgba(103, 97, 168, 0.3)',
        borderColor: 'black',
        borderWidth: 1,
      };
      const updatedDatasets = [...datasetsList, newDataset];
      setDatasetsList(updatedDatasets);
      console.log(updatedDatasets);
    }
  }, [selectedBreedInfo]);
  const toggleDropdown = () => {
    // Toggle the dropdown state
    setIsDropdownOpen(!isDropdownOpen);
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
    setSelectedPredictionIndex(null);
  }
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
        {/* {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md">
              <h2 className="text-lg font-bold mb-4">Loading</h2>
              <div className="w-full h-2 bg-gray-300 mb-4">
                <div className="h-full bg-primary" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>
        )} */}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center font-outfit">
            <div className="relative bg-white p-4 rounded-md sm:w-full md:w-9/12 lg:w-9/12 xl:w-9/12 text-center">

              <h1 className="text-3xl font-bold mb-4">What is it like owning a {predictions[selectedPredictionIndex].label}?</h1>
              <button
                onClick={() => handleModalClose()}
                type="button"
                className="w-12 h-12 dark:text-neutral-100 btn btn-sm btn-circle btn-ghost absolute top-4 right-4">
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </button>
              {selectedPredictionIndex !== null && (
                <div className="grid grid-cols-1 gap-4 py-1 sm:grid-cols-2  md:py-4 md:grid-cols-3 md:gap-y-1 md:gap-x-4 text-gray-700 justify-center content-center	">
                  <p> {predictions[selectedPredictionIndex].label} detected with {(predictions[selectedPredictionIndex].score * 100).toFixed(1)} %</p>
                  <p>{predictions[selectedPredictionIndex].label}  Characteristics</p>
                  <div className="dropdown dropdown-bottom flex justify-center content-center ">
                    <div tabIndex={0} role="button" className="btn m-1" onClick={toggleDropdown}>
                      {isDropdownOpen ? 'Close' : 'Compare to Other dogs'}
                    </div>
                    {isDropdownOpen && (
                    <ul
                      className="dropdown-content z-[1] menu p-2 *:shadow bg-base-100 rounded-box w-52 max-h-40">
                      <div className="overflow-y-auto max-h-96">
                        {breeds.map((breed, index) => (
                          <li key={index} onClick={() => handleBreedSelect(breed[0])} >
                            <button className='btn btn-ghost text-center' >{breed[0]}</button>
                          </li>
                        ))}
                      </div>
                    </ul>)}
                  </div>
                  <div className="flex items-center justify-center px-5 ">
                    <img
                      src={URL.createObjectURL(images[selectedPredictionIndex])}
                      alt={`Selected ${selectedPredictionIndex + 1}`}
                      className="sm:w-32 sm:h-32 md:w-64 md:h-64 rounded-full drop-shadow-xl"
                    />
                  </div>
                  {breedInfo[selectedPredictionIndex][0] && (

                    <div className=" flex items-center justify-center h-96 min-w-80 ">

                      <Radar
                        data={{
                          labels: ['Good with Children',
                            'Good with Other Dogs',
                            'Shedding',
                            'Grooming',
                            'Drooling',
                            'Coat Length',
                            'Good with Strangers',
                            'Playfulness',
                            'Protectiveness',
                            'Trainability',
                            'Energy',
                            'Barking',],
                          datasets: datasetsList.concat([ {
                            label: 'Score out of 5',
                            data: [
                              breedInfo[selectedPredictionIndex][0].good_with_children,
                              breedInfo[selectedPredictionIndex][0].good_with_other_dogs,
                              breedInfo[selectedPredictionIndex][0].shedding,
                              breedInfo[selectedPredictionIndex][0].grooming,
                              breedInfo[selectedPredictionIndex][0].drooling,
                              breedInfo[selectedPredictionIndex][0].coat_length,
                              breedInfo[selectedPredictionIndex][0].good_with_strangers,
                              breedInfo[selectedPredictionIndex][0].playfulness,
                              breedInfo[selectedPredictionIndex][0].protectiveness,
                              breedInfo[selectedPredictionIndex][0].trainability,
                              breedInfo[selectedPredictionIndex][0].energy,
                              breedInfo[selectedPredictionIndex][0].barking,
                            ],
                            backgroundColor: 'rgba(103, 97, 168, 0.3)',
                            borderColor: 'black',
                            borderWidth: 1,

                          }])

                        }}
                        options={{

                          scale: {
                            min: 0,
                            max: 5,
                            stepSize: 1,
                            ticks: {
                              // beginAtZero: true,
                              // min: 0,
                              // max: 10,
                              // stepSize: 2,
                            },
                          },
                          plugins: {
                            legend: {
                              display: false,
                            }
                          }
                        }}
                      ></Radar>
                    </div>
                  )}
                  <div className='row-start-3'>
                    {/* {predictions[selectedPredictionIndex].score && (
                        <p>Confidence score: {predictions[selectedPredictionIndex].score * 100}%</p>
                      )} */}
                    <p>Life expectancy: {breedInfo[selectedPredictionIndex][0].min_life_expectancy} to
                      {breedInfo[selectedPredictionIndex][0].max_life_expectancy} Years</p>
                    <p>Height in Males: {breedInfo[selectedPredictionIndex][0].min_height_male} to
                      {breedInfo[selectedPredictionIndex][0].max_height_male} Inches</p>
                    <p>Height in Females: {breedInfo[selectedPredictionIndex][0].min_height_female} to
                      {breedInfo[selectedPredictionIndex][0].max_height_female} Inches</p>
                    <p>Weight in Males: {breedInfo[selectedPredictionIndex][0].min_weight_male} to
                      {breedInfo[selectedPredictionIndex][0].max_weight_male} Lbs</p>
                    <p>Weight in Females: {breedInfo[selectedPredictionIndex][0].min_weight_female} to
                      {breedInfo[selectedPredictionIndex][0].max_weight_female} Lbs</p>

                  </div>

                </div>
              )}
              <button
                className="mt-4 p-2 bg-primary rounded-md"
                onClick={() => {
                  handleModalClose();
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