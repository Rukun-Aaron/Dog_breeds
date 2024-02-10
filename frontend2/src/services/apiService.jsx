

const apiUrl = 'https://dogbreed.dogbreeds.tech/';  // Update with your actual API endpoint

export const getPredictions = async (formData) => {
  const classifyResponse = await fetch('https://dogbreed.dogbreeds.tech/classify', {
          method: 'POST',
          body: formData,
        });
  return classifyResponse;
};

export const getBreedInfo = async(label)=>{
  const getDogInfoResponse   =await fetch(`https://dogbreed.dogbreeds.tech/get_dog_info?breed=${label}`, {
    method: 'GET', // or 'GET' depending on your API
  });
  return getDogInfoResponse;
  
}

export const getAllBreedNames = async()=>{
  const getAllBreedInfoResponse =await fetch(`https://dogbreed.dogbreeds.tech/get_all_breeds`,{
    method: 'GET'
  });
  return getAllBreedInfoResponse;
}


export const getBreedInfoImage = async()=>{
  const getAllBreedInfoResponse =await fetch(`https://dogbreed.dogbreeds.tech/get_all_breeds_with_images`,{
    method: 'GET'
  });
  return getAllBreedInfoResponse;
}


export const getAllBreedInfo = async()=>{
  const getAllBreedInfoResponse =await fetch(`https://dogbreed.dogbreeds.tech/get_all_breed_info`,{
    method: 'GET'
  });
  return getAllBreedInfoResponse;
}
