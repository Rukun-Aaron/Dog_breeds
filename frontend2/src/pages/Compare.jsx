import { useState, useEffect } from 'react'
import * as React from 'react';

import Navbar from '../components/NavBar'
import  {getAllBreedInfo}  from '../services/apiService';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const tags = [
  { value: 'Trainable', title: 'trainability' },
  { value: 'Energetic', title: 'energy' },
  { value: 'Less Tendancy to Bark', title: 'barking' },
  { value: 'Good with Strangers', title: 'good_with_strangers' },
  { value: 'Good with Kids', title: 'good_with_children' },
  { value: 'Good with Other Dogs', title: 'good_with_other_dogs' },
  { value: 'Less Tendancy to Shed', title: 'shedding' },
  { value: 'Little Grooming Needs', title: 'grooming' },
  { value: 'Less Tendancy to Drool', title: 'drooling' },
  // { value: 'Long Coat Length', title: 'coat_length' },
  // { value: 'Short Coat Length', title: 'coat_length' },
  { value: 'Playful', title: 'playfulness' },
  { value: 'Protective', title: 'protectiveness' }
]
const Compare = () => {
  const [breeds, setBreeds] = useState([])
  const [filter, setFilter] = useState('')

  // const [selectedOptions, setSelectedOptions] = useState([]);




  const [selectedTags, setSelectedTags] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const filteredBreeds = breeds.filter((breed) => {
    const filterByName = breed.name.toLowerCase().includes(filter.toLowerCase())

    // return filterByName

    return filterByName && selectedTags.every((option) => {
      if (option.title == "barking" || option.title == "shedding" || option.title == "drooling" || option.title == "grooming") {
        return breed[option.title] && breed[option.title] < 2;
      } else {
        return breed[option.title] && breed[option.title] >= 3;
      }

    });
  });
  // console.log(selectedOptions)

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
                <div className='join'>
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={tags}
                    disableCloseOnSelect
                    getOptionLabel={(tag) => tag.value}
                    renderOption={(props, tag, { selected }) => (
                      <MenuItem {...props} sx={{ padding: '20px 0' }}>
                        {selected ? checkedIcon : icon}
                        {tag.value}
                      </MenuItem>
                    )}
                    style={{ width: 400 }}
                    value={selectedTags} // Connect to state for selected tags
                    onChange={(event, newSelectedTags) => setSelectedTags(newSelectedTags)} // Update state on change
                    renderInput={(params) => (
                      <TextField {...params} label="Tags" placeholder="Select tags" />
                    )}
                  />
                  <input
                    placeholder="Filter"
                    className="dark:bg-neutral-900 dark:text-neutral-100 dark:border-white 
                    input input-bordered join-item w-full h-14 "
                    onChange={(e) => {
                      e.preventDefault();
                      setFilter(e.target.value);
                      // setCurrentPage(1);
                    }}
                  />
                  {/* <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={tags}
                    //  value={selectedOptions}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    onChange={handleOnChange}
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
                  /> */}


                  {/* <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={selectedTags}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tags" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {tags.map((tag) => (
                          <MenuItem key={tag.value} value={tag.value}>
                            <Checkbox checked={selectedTags.indexOf(tag.value) > -1} />
                            <ListItemText primary={tag.value} secondary={tag.title} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}

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