import { useState, useEffect } from 'react';
import * as React from 'react';
import Navbar from '../components/NavBar';
import { getAllBreedInfo } from '../services/apiService';
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
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Modal2 from '../components/Modal2';

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
];

const Compare = () => {
  const [breeds, setBreeds] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const breedsPerPage = 6;
  const [breedInfo, setBreedInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(typeof value === 'string' ? value.split(',') : value);
  };

  const filteredBreeds = breeds.filter((breed) => {
    const filterByName = breed.name.toLowerCase().includes(filter.toLowerCase());

    return filterByName && selectedTags.every((option) => {
      if (option.title === 'barking' || option.title === 'shedding' || option.title === 'drooling' || option.title === 'grooming') {
        return breed[option.title] && breed[option.title] < 2;
      } else {
        return breed[option.title] && breed[option.title] >= 3;
      }
    });
  });

  const indexOfLastBreed = currentPage * breedsPerPage;
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
  const currentBreeds = filteredBreeds.slice(indexOfFirstBreed, indexOfLastBreed);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(filteredBreeds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
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

  const handleModalClick = (index) => {
    setShowModal(true);
    setSelectedIndex((currentPage - 1) * breedsPerPage + index);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedIndex(null);
  }

  return (
    <div className='w-full h-screen drawer drawer-end' >
      <div className="pt-4"><Navbar />

        <div className='h-full dark:bg-neutral-900 scrollbar overflow-y-auto'>
          <div className='flex justify-center overflow-x-hidden pt-24 h-fit'>
            <div className='w-11/12 max-w-5xl xl:max-w-6xl'>
              <div className='flex items-center justify-between'>
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
                    style={{ width: 420 }}
                    value={selectedTags} // Connect to state for selected tags
                    onChange={(event, newSelectedTags) => setSelectedTags(newSelectedTags)} // Update state on change
                    renderInput={(params) => (
                      <TextField {...params} label="Tags" placeholder="Select tags" />
                    )}
                  />
                  <input
                    placeholder="Search"
                    className="dark:bg-neutral-900 dark:text-neutral-100 dark:border-white 
                    input input-bordered join-item w-full h-14"
                    onChange={(e) => {
                      e.preventDefault();
                      setFilter(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className='w-full'>
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr className="bg-base-200">
                      <th>1</th>
                      <td>Cy Ganderton</td>
                      <td>Quality Control Specialist</td>
                      <td>Blue</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>2</th>
                      <td>Hart Hagerty</td>
                      <td>Desktop Support Technician</td>
                      <td>Purple</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                  </tbody>
                </table>
                <table className="table  dark:text-neutral-100">
                  {/* <thread>
                    <tr>
                      <th className="p-2 dark:text-neutral-100">Image</th>
                      <th className="p-2 dark:text-neutral-100">Breed </th>
                      <th className="p-2 hidden md:table-cell dark:text-neutral-100">Tags</th>
                      <th className="p-2 dark:text-neutral-100">Tags</th>
                    </tr>
                  </thread> */}
                   <thead>
                    <tr>
                      
                    <th className="p-2 dark:text-neutral-100">Image</th>
                    <th className="p-2 dark:text-neutral-100">Breed </th>
                    <th className="p-2 dark:text-neutral-100">Tags</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                    {filteredBreeds.length > 0 && filteredBreeds.slice(startIndex, endIndex).map((breed, index) => (
                      <tr
                        key={index}
                        className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all ease-in-out duration-300 cursor-pointer"
                        onClick={() => handleModalClick(index)}
                      // onClick={(e) => {
                      //   openModal(e, getOriginalIndex(prediction));
                      // }}
                      >
                        <td className="p-2">
                          <div className="flex gap-4">
                            {breed.image_link ? (
                              <div className="w-32 h-16 flex items-center justify-center">
                                <img className="max-w-32 max-h-16 rounded-md" src={breed.image_link} alt={breed.name} />
                              </div>
                            ) : (
                              <p>Loading image...</p>
                            )}

                            <span className="hidden truncate lg:flex items-center">
                              {breed.name}
                            </span>
                          </div>
                        </td>
                        <td>Quality Control Specialist</td>
                      <td>Blue</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* {filteredBreeds.length > 0 && (
                  <div className="mt-8 w-full flex flex-col my-8">
                    {currentBreeds.map((breed, index) => (
                      <div
                        key={index}
                        className="flex w-full items-center p-4 gap-4 rounded-xl 
                      transition-all cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 
                      animate-ease-in-out animate-jump animate-once animate-duration-700 relative"
                        onClick={() => handleModalClick(index)}
                      >
                        <div className="w-32 h-16 flex items-center justify-center">
                          <img
                            src={breed.image_link}
                            alt={`Selected ${index + 1}`}
                            className="max-w-32 max-h-16 rounded-md"
                          />
                        </div>
                        <div className="dark:text-neutral-100 truncate mr-auto">{breed.name}</div>
                      </div>
                    ))}

                    <div className="flex justify-center mt-8">
                      <Pagination
                        count={Math.ceil(filteredBreeds.length / breedsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                      />
                    </div>

                  </div>
                )} */}
                <Modal2
                  showModal={showModal}
                  handleModalClose={handleModalClose}
                  selectedIndex={selectedIndex}
                  breeds={breeds}
                  breedInfo={breedInfo}
                // images={images}

                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}


export default Compare;