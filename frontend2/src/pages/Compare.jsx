import React, { useState, useEffect } from 'react'
import Navbar from '../components/NavBar'
import { getBreedInfoImage } from '../services/apiService';
const Compare = () => {
  const [breeds, setBreeds] = useState([])

  console.log(breeds)
  useEffect(() => {
    // Fetch breed data when the component mounts
    const fetchData = async () => {
      try {
        const response = await getBreedInfoImage();
        const data = await response.json();
        const formattedData = data.map((item) => ({
          name: item[0], // You can adjust the value as needed
          image: item[1],
        }));
        setBreeds(formattedData);
      } catch (error) {
        console.error('Error fetching breed data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='w-full h-full flex flex-col items-center relative z-0' >
      <div className="pt-4"><Navbar />
        {breeds.length > 0 && (
          <div className='mt-4 w-full flex flex-col gap2 my-8 px-8'>
            {breeds.map((breed, index) => (
              <div
                key={index}
                className="flex w-full items-center p-4 gap-4 rounded-xl 
              transition-all cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 
              animate-ease-in-out animate-jump animate-once animate-duration-700 relative"
              >
                <div className="w-32 h-16 flex items-center justify-center">
                  <img
                    src={breed.image} 
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

  )
}

export default Compare