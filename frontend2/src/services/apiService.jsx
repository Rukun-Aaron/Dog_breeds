

const apiUrl = 'http://127.0.0.1:8000/';  // Update with your actual API endpoint

export const getPredictions = async (formData) => {
  const classifyResponse = await fetch('http://127.0.0.1:8000/classify', {
          method: 'POST',
          body: formData,
        });
  return classifyResponse;
};

export const getBreedInfo = async(label)=>{
  const getDogInfoResponse   =await fetch(`http://127.0.0.1:8000/get_dog_info?breed=${label}`, {
    method: 'GET', // or 'GET' depending on your API
  });
  return getDogInfoResponse;
  
}

export const getAllBreedNames = async()=>{
  const getAllBreedInfoResponse =await fetch(`http://127.0.0.1:8000/get_all_breeds`,{
    method: 'GET'
  });
  return getAllBreedInfoResponse;
}


export const getBreedInfoImage = async()=>{
  const getAllBreedInfoResponse =await fetch(`http://127.0.0.1:8000/get_all_breeds_with_images`,{
    method: 'GET'
  });
  return getAllBreedInfoResponse;
}


// export const getAllBreedInfo = async()=>{
//   const getAllBreedInfoResponse =await fetch(`http://127.0.0.1:8000/get_all_breed_info`,{
//     method: 'GET'
//   });
//   return getAllBreedInfoResponse;
// }
