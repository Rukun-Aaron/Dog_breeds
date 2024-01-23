// ModalComponent.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
const Modal = ({ showModal, handleModalClose, predictions, selectedPredictionIndex, toggleDropdown, selectedBreed, isDropdownOpen,
    breeds, breedInfo, images, selectedBreedImage, selectedBreedInfo, datasetsList, handleBreedSelect }) => {
    return (
        <>
            {/* sm:w-9/12 sm:h-48 md:w-9/12 md:h-[30rem] lg:h-[30rem] xl:h-[45rem]  2xl:h-[49rem] */}
            {showModal && (
                <div className="z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center  items-center font-outfit">
                    <div className="relative  bg-white p-4 m-2 rounded-2xl  h-[80%] min-w-[320px] aspect-9/16 sm sm:aspect-auto  md:h-[80%] lg:aspect-video  lg:h-[40rem] xl:h-[44rem]  text-center overflow-y-auto">
                        <div className='flex flex-row justify-center'>
                            <span className="text-3xl font-bold mb-4 text-center">What is it like owning a {predictions[selectedPredictionIndex].label}?</span>
                            <button
                                onClick={handleModalClose}
                                type="button"
                                className="w-12 h-12 dark:text-neutral-100 btn btn-sm btn-circle btn-ghost absolute top-4 right-4">
                                <FontAwesomeIcon icon={faTimes} size="lg" />
                            </button>
                        </div>
                        {/* mid:grid-cols-2 2xl:grid-cols-3 */}

                        {selectedPredictionIndex !== null && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-gray-700 justify-center content-center ">
                                <div className='flex  items-center justify-center px-5 row-start-1 lg:col-start-1'>
                                    <div tabIndex={0} role="button" className="btn w-48   " onClick={toggleDropdown}>
                                        {predictions[selectedPredictionIndex].label}
                                    </div>
                                    {/* <p> {predictions[selectedPredictionIndex].label} detected with {(predictions[selectedPredictionIndex].score * 100).toFixed(1)} %</p> */}

                                </div>
                                <div className='flex items-center justify-center px-5'>
                                    <p>{predictions[selectedPredictionIndex].label}  Characteristics</p>

                                </div>
                                <div className="dropdown dropdown-bottom flex  justify-center items-center">
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
                                </div>

                                <div className='flex items-center justify-center px-5'>

                                    <img
                                        src={URL.createObjectURL(images[selectedPredictionIndex])}
                                        alt={`Selected ${selectedPredictionIndex + 1}`}
                                        className="sm:w-64 sm:h-64 md:w-64 md:h-64 rounded-full drop-shadow-xl "
                                    />

                                </div>

                                {breedInfo[selectedPredictionIndex][0] && (

                                    <div className=" flex items-center justify-center content-center w-full h-full">

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

                                {selectedBreedImage ? (
                                    <div className="flex items-center justify-center z-[1] px-5  py-[4rem]">
                                        <img
                                            src={selectedBreedInfo[0].image_link}
                                            alt={`Selected ${selectedPredictionIndex + 1}`}
                                            className="sm:w-64 sm:h-64 md:w-64 md:h-64 rounded-full drop-shadow-xl"
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

                                <div className=' flex  flex-col'>
                                    {/* {predictions[selectedPredictionIndex].score && (
                        <p>Confidence score: {predictions[selectedPredictionIndex].score * 100}%</p>
                      )} */}
                                    <p>Life expectancy: {breedInfo[selectedPredictionIndex][0].min_life_expectancy} to {" "}
                                        {breedInfo[selectedPredictionIndex][0].max_life_expectancy} Years</p>
                                    <p>Height in Males: {breedInfo[selectedPredictionIndex][0].min_height_male} to {" "}
                                        {breedInfo[selectedPredictionIndex][0].max_height_male} Inches</p>
                                    <p>Height in Females: {breedInfo[selectedPredictionIndex][0].min_height_female} to {" "}
                                        {breedInfo[selectedPredictionIndex][0].max_height_female} Inches</p>
                                    <p>Weight in Males: {breedInfo[selectedPredictionIndex][0].min_weight_male} to {" "}
                                        {breedInfo[selectedPredictionIndex][0].max_weight_male} Lbs</p>
                                    <p>Weight in Females: {breedInfo[selectedPredictionIndex][0].min_weight_female} to {" "}
                                        {breedInfo[selectedPredictionIndex][0].max_weight_female} Lbs</p>

                                </div>
                                {
                                    selectedBreedInfo.length > 0 && (
                                        <div className='flex  flex-col'>

                                            <p>Life expectancy: {selectedBreedInfo[0].min_life_expectancy} to {" "}
                                                {selectedBreedInfo[0].max_life_expectancy} Years</p>
                                            <p>Height in Males: {selectedBreedInfo[0].min_height_male} to {" "}
                                                {selectedBreedInfo[0].max_height_male} Inches</p>
                                            <p>Height in Females: {selectedBreedInfo[0].min_height_female} to {" "}
                                                {selectedBreedInfo[0].max_height_female} Inches</p>
                                            <p>Weight in Males: {selectedBreedInfo[0].min_weight_male} to {" "}
                                                {selectedBreedInfo[0].max_weight_male} Lbs</p>
                                            <p>Weight in Females: {selectedBreedInfo[0].min_weight_female} to {" "}
                                                {selectedBreedInfo[0].max_weight_female} Lbs</p>

                                        </div>
                                    )}


                            </div>
                        )}

                        <button
                            className="mt-4 p-2 bg-primary rounded-md  inline-block md:hidden "
                            onClick={handleModalClose}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
