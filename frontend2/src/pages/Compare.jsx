import  { useState, useEffect } from 'react'
import * as React from 'react';

import Navbar from '../components/NavBar'
import { getAllBreedInfo } from '../services/apiService';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Compare = () => {
  const [breeds, setBreeds] = useState([])
  const [filter, setFilter] = useState('')
  
  const [selectedOptions, setSelectedOptions] = useState(null);

  const handleOnChange = (event, value) => {
    setSelectedOptions(value);
  }
  const filteredBreeds = breeds.filter((breed) => {
    const filterByName = breed.name.toLowerCase().includes(filter.toLowerCase())
  
    return filterByName
  })
  console.log(breeds)
  const tags = [
    { title: 'Trainable' , value:'trainability' },
    { title: 'Energetic' , value:'energy'},
    { title: 'Less Tendancy to Bark', value:'barking' },
    { title: 'Good with Strangers', value:'good_with_strangers' },
    { title: 'Good with Kids' , value:'good_with_children'},
    { title: 'Good with Other Dogs', value:'good_with_other_dogs' },
    { title: 'Less Tendancy to Shed', value:'shedding'},
    { title: 'Little Grooming Needs', value:'grooming' },
    { title: 'Tendancy to Drool', value:'drooling'},
    { title: 'Long Coat Length', value:'coat_length' },
    { title: 'Short Coat Length', value:'coat_length'},
    { title: 'Playful', value:'playfulness' },
    { title: 'Protective', value:'protectiveness' }
  ]
  useEffect(() => {
    // Fetch breed data when the component mounts
    const fetchData = async () => {
      try {
        const response = await getAllBreedInfo();
        const data = await response.json();
        // const formattedData = data.map((item) => ({
        //   name: item[0], // You can adjust the value as needed
        //   image: item[1],
        // }));
        setBreeds(data);
      } catch (error) {
        console.error('Error fetching breed data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='w-full h-screen drawer drawer-end' >
      <div className="pt-4"><Navbar />

        <div className='h-full w-full dark:bg-neutral-900 scrollbar overflow-y-auto'>
          <div className='flex justify-center overflow-x-hidden pt-24 pb-4 h-fit w-full'>
            <div className='max-w-5xl xl:max-w-6xl w-11/12'>
              <div className='sm:px-2 pb-2 flex items-center justify-between'>
                <div className='join-vertical'>
                  <input
                    placeholder="Filter"
                    className="dark:bg-neutral-900 dark:text-neutral-100 dark:border-white 
                    input input-bordered join-item w-full mb-5"
                    onChange={(e) => {
                      e.preventDefault();
                      setFilter(e.target.value);
                      // setCurrentPage(1);
                    }}
                  />
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={tags}
                    onChange={handleOnChange}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.title}
                      </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Checkboxes" placeholder="Favorites" />
                    )}
                  />
                </div>
              </div>
              <div className='w-full'>
                {filteredBreeds.length > 0 && (
                  <div className='mt-4 w-full flex flex-col gap2 my-8 px-8'>
                    {filteredBreeds.map((breed, index) => (
                      <div
                        key={index}
                        className="flex w-full items-center p-4 gap-4 rounded-xl 
              transition-all cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 
              animate-ease-in-out animate-jump animate-once animate-duration-700 relative"
                      >
                        <div className="w-32 h-16 flex items-center justify-center">
                          <img
                            src={breed.image_link}
                            alt={`Selected ${index + 1}`}
                            className="max-w-32 max-h-16 rounded-md"
                          />

                        </div>
                        <div className="dark:text-neutral-100 truncate mr-auto">
                          {breed.name}
                        </div>


                      </div>
                    ))}

                  </div>

                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}

export default Compare