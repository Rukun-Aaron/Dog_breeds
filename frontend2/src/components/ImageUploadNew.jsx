import React, {
    useEffect, useRef, useState, MouseEvent,
  } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudArrowUp, faXmark, faTrash, faFileCsv, faFileExcel,
} from '@fortawesome/free-solid-svg-icons';

const ImageUploadNew = () => {
    // const inputFile = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const inputFile = useRef(null);
    const [images, setImages] = useState([]);
    // const [imageUrls, setImageUrls] = useState([]);
    // const [isLoading, setIsLoading] = useState([]);
    // // const [predictions, setPredictions] = useState<([]);
    // const [isChecked, setIsChecked] = useState([]);
    // const [models, setModels] = useState([]);
    // const [selectedModel, setSelectedModel] = useState('');
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
    return (
        <div className="w-full h-fit flex justify-center overflow-x-hidden pt-24 pb-4">
            <div className="max-w-4xl xl:max-w-5xl w-11/12 flex flex-col items-center h-fit gap-4">
                <h1 className="font-varela text-xl font-bold dark:text-neutral-100">Upload</h1>
                <h1 className="text-xl font-varela text-center dark:text-neutral-100">
                    Drag and Drop or Browse to Upload
                    Image
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
          // onClick={(e) => addImages(e)}
          // onDragOver={(e) => handleDragOver(e)} // code needs to the changed later
          // onDrop={(e) => handleDrop(e)} // code needs to be changed later
          // onDragEnter={(e) => handleDragEnter(e)}
          // onDragLeave={(e) => handleDragLeave(e)}
        ></div>
            </div>

        </div>
    );
};

export default ImageUploadNew;