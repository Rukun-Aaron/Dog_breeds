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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight, faArrowLeft, faTrash, faFileCsv, faFileExcel, faXmark,
} from '@fortawesome/free-solid-svg-icons';
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
  const breedsPerPage = 10;
  const [breedInfo, setBreedInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);


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

  const [isLoading, setIsLoading] = useState(true)
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalPages = Math.ceil(filteredBreeds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePageChange = (value) => {
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
    setSelectedIndex((currentPage - 1) * itemsPerPage + index);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedIndex(null);
  }

  const [personName, setPersonName] = React.useState([]);
  
  const handleChange = (event) => {

    const {
      target: { value },
    } = event;
    setSelectedTags(
      // On autofill we get a stringified value.
      // typeof value === 'string' ? value.split(',') : value,
      value
    );
  };
  // console.log(selectedTags)
  return (
    <div className='w-full h-screen drawer drawer-end' >
      <div className="pt-4"><Navbar />

        <div className='h-full scrollbar overflow-y-auto'>
          <div className='flex justify-center pt-24 h-fit'>
            <div className='w-4/5 md:w-11/12 max-w-xl xl:max-w-7xl'>
              <div className='flex items-center justify-between'>
                <div className='join'>
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={tags}
                    disableCloseOnSelect
                    getOptionLabel={(tag) => tag.value}
                    renderOption={(props, tag, { selected }) => (
                      <MenuItem {...props} style={{ padding: '10px 0' }}>
                        {selected ? checkedIcon : icon}
                        {tag.value}
                      </MenuItem>
                    )}
                    style={{ 
                      width: '620px',
                    }}
                    className='max-w-xs md:max-w-xl'
                    value={selectedTags} 
                    onChange={(event, newSelectedTags) => {
                      handlePageChange(1);
                      setSelectedTags(newSelectedTags)
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Tags" placeholder="Select tags" />
                    )}
                  />
                  {/* <FormControl sx={{ width: 620 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={selectedTags}
                      onChange={handleChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {tags.map((name) => (
                        <MenuItem key={name.title} value={name.value}>
                          <Checkbox checked={selectedTags.indexOf(name.value) > -1} />
                          <ListItemText primary={name.value} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
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
                <table className="table dark:text-neutral-100">
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
                      >
                        <td className="p-0 md:p-2 w-6">
                          <div className="flex flex-row items-center">

                            {breed.image_link ? (

                              <div className="w-32 h-16 flex items-center justify-center">
                                <img className="max-w-32 max-h-16 rounded-md" src={breed.image_link} alt={breed.name} />
                              </div>
                            ) : (
                              <p>Loading image...</p>
                            )}

                          </div>
                        </td>
                        <td className=''>
                          <div className="flex flex-row items-center">
                            {breed.name}
                          </div>
                        </td>
                        <td className="">
                          <div className="flex text-xs md:text-sm flex-row gap-x-2 gap-y-2 pb-2 flex-wrap">
                            {/* First row */}
                            {breed.trainability > 2 && (
                              <div className="text-[#694DDB] text-center rounded-2xl border border-[#694DDB] px-2 hover:bg-[#694DDB] hover:text-white hover:border-[#694DDB] w-max">
                                Trainable
                              </div>
                            )}
                            {breed.good_with_children > 2 && (
                              <div className="text-[#DE6FEC] text-center rounded-2xl border border-[#DE6FEC] px-2 hover:bg-[#DE6FEC] hover:text-white hover:border-[#DE6FEC] w-max">
                                Good with Children
                              </div>
                            )}
                            {breed.energy > 2 && (
                              <div className="text-[#d1105a] text-center rounded-2xl border border-[#d1105a] px-2 hover:bg-[#d1105a] hover:text-white hover:border-[#d1105a] w-max">
                                Energetic
                              </div>
                            )}
                            {breed.barking < 3 && (
                              <div className="text-[#57cc99] text-center rounded-2xl border border-[#57cc99] px-2 hover:bg-[#57cc99] hover:text-white hover:border-[#57cc99] w-max">
                                Less Tendency to Bark
                              </div>
                            )}
                            {breed.good_with_strangers > 2 && (
                              <div className="text-[#ffb57d] text-center rounded-2xl border border-[#ffb57d] px-2 hover:bg-[#ffb57d] hover:text-white hover:border-[#ffb57d] w-max">
                                Good with Strangers
                              </div>
                            )}
                          </div>
                          <div className="flex flex-row text-xs md:text-sm gap-x-2 gap-y-2 gap-2 flex-wrap">
                            {/* Second row */}
                            {breed.good_with_children > 2 && (
                              <div className="text-[#FF9330] text-center rounded-2xl border border-[#FF9330] px-2 hover:bg-[#FF9330] hover:text-white hover:border-[#FF9330] w-max">
                                Good with Kids
                              </div>
                            )}
                            {breed.good_with_other_dogs > 2 && (
                              <div className="text-[#65BBDF] text-center rounded-2xl border border-[#65BBDF] px-2 hover:bg-[#65BBDF] hover:text-white hover:border-[#65BBDF] w-max">
                                Good with Other Dogs
                              </div>
                            )}
                            {breed.shedding < 3 && (
                              <div className="text-[#F24545] text-center rounded-2xl border border-[#F24545] px-2 hover:bg-[#F24545] hover:text-white hover:border-[#F24545] w-max">
                                Less Tendency to Shed
                              </div>
                            )}
                            {breed.grooming < 3 && (
                              <div className="text-[#BBF245] text-center rounded-2xl border border-[#BBF245] px-2 hover:bg-[#BBF245] hover:text-white hover:border-[#BBF245] w-max">
                                Little Grooming Needs
                              </div>
                            )}
                            {breed.drooling < 3 && (
                              <div className="text-[#3BCD17] text-center rounded-2xl border border-[#3BCD17] px-2 hover:bg-[#3BCD17] hover:text-white hover:border-[#3BCD17] w-max">
                                Less Tendency to Drool
                              </div>
                            )}
                            {breed.playfulness > 2 && (
                              <div className="text-[#EFE606] text-center rounded-2xl border border-[#EFE606] px-2 hover:bg-[#EFE606] hover:text-white hover:border-[#EFE606] w-max">
                                Playful
                              </div>
                            )}
                            {breed.protectiveness > 2 && (
                              <div className="text-[#B334E0] text-center rounded-2xl border border-[#B334E0] px-2 hover:bg-[#B334E0] hover:text-white hover:border-[#B334E0] w-max">
                                Protective
                              </div>
                            )}
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
                <Modal2
                  showModal={showModal}
                  handleModalClose={handleModalClose}
                  selectedIndex={selectedIndex}
                  filteredBreeds={filteredBreeds}
                  breeds={breeds}
                  breedInfo={breedInfo}
                />
              </div>
              <div className="flex justify-end sm:justify-start xl:justify-end px-2 pt-4">
                <div className="join items-center">
                  <div className="tooltip" data-tip="item per page">
                    <select
                      className="select dark:bg-neutral-900 dark:text-neutral-100 dark:border-white select-bordered join-item rounded-lg !rounded-l-lg"
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      value={itemsPerPage}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className={`join-item btn dark:disabled:bg-neutral-800 ${currentPage === 1 ? 'cursor-not-allowed ' : 'dark:bg-neutral-900'}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <div className="dark:text-neutral-100">
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </div>

                  </button>
                  <select className="dark:bg-neutral-900 dark:text-neutral-100 dark:border-white select select-bordered join-item" onChange={(e) => setCurrentPage(Number(e.target.value))} value={currentPage}>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <option key={i} value={i + 1}>
                        Page
                        {' '}
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className={`join-item btn dark:disabled:bg-neutral-800 ${currentPage === totalPages ? 'cursor-not-allowed' : 'dark:bg-neutral-900'}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <div className="dark:text-neutral-100">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}


export default Compare;