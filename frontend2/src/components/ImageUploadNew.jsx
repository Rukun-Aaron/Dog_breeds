import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import {
  getPredictions, getBreedInfo
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

import { Radar, Bar ,Chart   } from 'react-chartjs-2';

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


  // const data = {
  //   labels: [
  //     'Good with Children',
  //     'Good with Other Dogs',
  //     'Shedding',
  //     'Grooming',
  //     'Drooling',
  //     'Coat Length',
  //     'Good with Strangers',
  //     'Playfulness',
  //     'Protectiveness',
  //     'Trainability',
  //     'Energy',
  //     'Barking',
  //   ],
  //   datasets: [
  //     {
  //       label: 'Breed Characteristics',
  //       data: [
  //         breedData.good_with_children,
  //         breedData.good_with_other_dogs,
  //         breedData.shedding,
  //         breedData.grooming,
  //         breedData.drooling,
  //         breedData.coat_length,
  //         breedData.good_with_strangers,
  //         breedData.playfulness,
  //         breedData.protectiveness,
  //         breedData.trainability,
  //         breedData.energy,
  //         breedData.barking,
  //       ],
  //       backgroundColor: 'aqua',
  //       borderColor: 'black',
  //     },
  //   ],
  // };
  useEffect(() => {
    console.log('Updated Predictions:', predictions);
  }, [predictions]);

  useEffect(() => {
    console.log('Updated beed info:', breedInfo);
  }, [breedInfo]);

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
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md w-4/12 ">
              <h2 className="text-lg font-bold mb-4">Prediction</h2>
              {selectedPredictionIndex !== null && (
                <div className="grid grid-cols-1 gap-4 py-1 sm:grid-cols-2 md:py-4 md:grid-cols-3 md:gap-y-8 text-gray-700">
                  <p>Predicted breed: {predictions[selectedPredictionIndex].label}</p>

                  {breedInfo[selectedPredictionIndex][0] && (

                    <div className="w-full h-96 col-span-2">
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
                          datasets: [
                            {
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
                              backgroundColor: 'rgba(255, 99, 132, 0.2)',
                              borderColor: 'black',
                              borderWidth: 1,

                            },
                          ],

                        }}
                        options={{
                          
                          scale: {
                            min: 0,
                            max: 5,
                            stepSize:1,
                            ticks: {
                              // beginAtZero: true,
                              // min: 0,
                              // max: 10,
                              // stepSize: 2,
                            },
                           
                        }}
                      }
                      ></Radar>
                    </div>

                  )}
                  {predictions[selectedPredictionIndex].score && (
                    <p>Confidence score: {predictions[selectedPredictionIndex].score * 100}%</p>
                  )}
                  {/* <p>
                    Good with Children: {breedInfo[selectedPredictionIndex][0].good_with_children}/5
                  </p>
                  <p>
                    Good with Other Dogs: {breedInfo[selectedPredictionIndex][0].good_with_other_dogs}/5
                  </p>
                  <p>
                    Amount of Shedding : {breedInfo[selectedPredictionIndex][0].shedding}/5
                  </p>
                  <p>
                    Need for Grooming : {breedInfo[selectedPredictionIndex][0].grooming}/5
                  </p>
                  
                  <p>
                    Tendancy to Drool: {breedInfo[selectedPredictionIndex][0].drooling}/5
                  </p>
                  <p>
                    Coat Length: {breedInfo[selectedPredictionIndex][0].coat_length}/5
                  </p>
                  <p>
                    Good with Strangers: {breedInfo[selectedPredictionIndex][0].good_with_strangers}/5
                  </p>
                  <p>
                    Playfulness: {breedInfo[selectedPredictionIndex][0].playfulness}/5
                  </p>
                  <p>
                    Protectiveness: {breedInfo[selectedPredictionIndex][0].protectiveness}/5
                  </p>
                  <p>
                    Trainability: {breedInfo[selectedPredictionIndex][0].trainability}/5
                  </p>
                  <p>
                    Energy: {breedInfo[selectedPredictionIndex][0].energy}/5
                  </p>
                  <p>
                    Tendency to Bark: {breedInfo[selectedPredictionIndex][0].barking}/5
                  </p>
                  <p>
                    Minimum Life Expectancy: {breedInfo[selectedPredictionIndex][0].min_life_expectancy} Years
                  </p>
                  <p>
                    Maximum Life Expectancy: {breedInfo[selectedPredictionIndex][0].max_life_expectancy} Years
                  </p>
                  <p>
                    Maximum Height in Males: {breedInfo[selectedPredictionIndex][0].max_height_male} Inches
                  </p>
                  <p>
                    Maximum Height in Females: {breedInfo[selectedPredictionIndex][0].max_height_female} Inches
                  </p>
                  <p>
                    Maximum Weight in Males: {breedInfo[selectedPredictionIndex][0].max_weight_male} Lbs
                  </p>
                  <p>
                    Maximum Weight in Females: {breedInfo[selectedPredictionIndex][0].max_weight_female} Lbs
                  </p>
                  <p>
                    Minimum Height in Males: {breedInfo[selectedPredictionIndex][0].min_height_male} Inches
                  </p>
                  <p>
                    Minimum Height in Females: {breedInfo[selectedPredictionIndex][0].min_height_female} Inches
                  </p>
                  <p>
                    Minimum Weight in Males: {breedInfo[selectedPredictionIndex][0].min_weight_male} Lbs
                  </p>
                  <p>
                    Minimum Weight in Females: {breedInfo[selectedPredictionIndex][0].min_weight_female} Lbs
                  </p> */}
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