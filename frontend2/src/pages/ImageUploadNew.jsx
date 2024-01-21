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
          <div className="z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center font-outfit">
            <div className="relative  bg-white p-4 rounded-md  sm:w-9/12 sm:h-48 md:w-9/12 md:h-[30rem] lg:h-[30rem] xl:h-[30rem] 2xl:h-[47rem] text-center overflow-y-auto">
              <h1 className="text-3xl font-bold mb-4">What is it like owning a {predictions[selectedPredictionIndex].label}?</h1>
              <button
                onClick={() => handleModalClose()}
                type="button"
                className="w-12 h-12 dark:text-neutral-100 btn btn-sm btn-circle btn-ghost absolute top-4 right-4">
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </button>
              {selectedPredictionIndex !== null && (
                <div className="grid grid-cols-1 gap-4 py-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-1 lg:gap-x-4 text-gray-700 justify-center content-center	">
                  <div className='flex flex-col items-center justify-center px-5 py-[11px]'>
                  <div tabIndex={0} role="button" className="btn w-48   " onClick={toggleDropdown}>
                      {predictions[selectedPredictionIndex].label}
                    </div>
                    {/* <p> {predictions[selectedPredictionIndex].label} detected with {(predictions[selectedPredictionIndex].score * 100).toFixed(1)} %</p> */}
                    <div className="flex items-center justify-center px-5 py-[4rem]">
                      <img
                        src={URL.createObjectURL(images[selectedPredictionIndex])}
                        alt={`Selected ${selectedPredictionIndex + 1}`}
                        className="sm:w-32 sm:h-32 md:w-64 md:h-64 rounded-full drop-shadow-xl "
                      />
                    </div>
                  </div>
                  <div className='flex flex-col items-center justify-center px-5'>
                    <p>{predictions[selectedPredictionIndex].label}  Characteristics</p>
                    {breedInfo[selectedPredictionIndex][0] && (

                      <div className=" flex items-center justify-center h-80 w-80 lg:h-96 lg:w-96">

                        <Radar
                          data={{
                            labels: ['Good with Children',
                              'Good with Other Dogs',
                              'Shedding',
                              'Grooming',
                              'Drooling',
                              'Coat Length',

                              'Playfulness',
                              'Protectiveness',
                              'Trainability',
                              'Energy',
                              'Barking',
                              'Good with Strangers',],
                            datasets: [{
                              label: `${predictions[selectedPredictionIndex].label}: Score out of 5`,
                              data: [
                                breedInfo[selectedPredictionIndex][0].good_with_children,
                                breedInfo[selectedPredictionIndex][0].good_with_other_dogs,
                                breedInfo[selectedPredictionIndex][0].shedding,
                                breedInfo[selectedPredictionIndex][0].grooming,
                                breedInfo[selectedPredictionIndex][0].drooling,
                                breedInfo[selectedPredictionIndex][0].coat_length,

                                breedInfo[selectedPredictionIndex][0].playfulness,
                                breedInfo[selectedPredictionIndex][0].protectiveness,
                                breedInfo[selectedPredictionIndex][0].trainability,
                                breedInfo[selectedPredictionIndex][0].energy,
                                breedInfo[selectedPredictionIndex][0].barking,
                                breedInfo[selectedPredictionIndex][0].good_with_strangers,
                              ],
                              backgroundColor: 'rgba(103, 97, 168, 0.3)',
                              borderColor: 'black',
                              borderWidth: 1,

                            }].concat(datasetsList)

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
                  </div>
                  <div className="dropdown dropdown-end   flex flex-col justify-center items-center md:row-start-3 lg:row-start-1 lg:col-start-3 ">
                    <div tabIndex={0} role="button" className="btn w-48   " onClick={toggleDropdown}>
                      {selectedBreed != null ? `${selectedBreed}` : 'Compare to Other dogs'}
                    </div>
                    {isDropdownOpen && (
                      <ul className="dropdown-content z-[2] menu p-2 *:shadow bg-base-100 rounded-box sm:max-h-64 w-52 max-h-50">
                        {/* Adjusted the margin-top (mt-2) to reduce vertical space */}
                        <div className="overflow-y-auto max-h-96">
                          {breeds.map((breed, index) => (
                            <li key={index} onClick={() => handleBreedSelect(breed[0])}>
                              <button className='btn btn-ghost text-center content-center'>{breed[0]}</button>
                            </li>
                          ))}
                        </div>
                      </ul>

                    )}
                    {selectedBreedImage ? (
                      <div className="flex items-center justify-center z-[1] px-5  py-[4rem]">
                        <img
                          src={selectedBreedInfo[0].image_link}
                          alt={`Selected ${selectedPredictionIndex + 1}`}
                          className="sm:w-32 sm:h-32 md:w-64 md:h-64 rounded-full drop-shadow-xl"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center z-[1]  px-5  py-[4rem] ">
                        <img
                          src={'data:image/png;base64,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'}
                          className="sm:w-32 sm:h-32 md:w-64 md:h-64 rounded-full drop-shadow-xl "
                        />
                      </div>
                    )}


                  </div>







                  <div className='row-start-3 '>
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
                  {
                    selectedBreedInfo.length > 0 && (
                      <div className='   md:col-start-2 md:row-start-5 lg:row-start-3 lg:col-start-3'>

                        <p>Life expectancy: {selectedBreedInfo[0].min_life_expectancy} to
                          {selectedBreedInfo[0].max_life_expectancy} Years</p>
                        <p>Height in Males: {selectedBreedInfo[0].min_height_male} to
                          {selectedBreedInfo[0].max_height_male} Inches</p>
                        <p>Height in Females: {selectedBreedInfo[0].min_height_female} to
                          {selectedBreedInfo[0].max_height_female} Inches</p>
                        <p>Weight in Males: {selectedBreedInfo[0].min_weight_male} to
                          {selectedBreedInfo[0].max_weight_male} Lbs</p>
                        <p>Weight in Females: {selectedBreedInfo[0].min_weight_female} to
                          {selectedBreedInfo[0].max_weight_female} Lbs</p>

                      </div>
                    )}


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