#read labels.txt and store in list
import requests
import json
import os
from dotenv import load_dotenv


load_dotenv()

# with open('labels.txt') as f:
#     breeds = f.read().splitlines()
# with open('dog_info.json', 'r') as file:
    # Load JSON data from the file
    # data = json.load(file)

# Now 'data' contains the contents of the JSON file as a Python dictionary

# loaded_dogs = [dog[0]['name'] for dog in data]
# print(loaded_dogs)
# print(breeds)
load_dotenv()
breeds=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
# breeds =['x']
loaded_names =[]

x =True
dog_info_list = []
for dog_breed in breeds:
    offset = 0
    
    while True:
            api_url = 'https://api.api-ninjas.com/v1/dogs?name={}&offset={}'.format(dog_breed, offset)
            response = requests.get(api_url, headers={'X-Api-Key': os.getenv('KEY')})
            if response.status_code == 200:
                dog_info = response.json()
                if len(dog_info) == 0:
                    print(f'No dog breeds : {dog_breed}')
                  
                    break
                else:
                    offset += len(dog_info)
                for d in dog_info:
                    if d['name'] not in loaded_names:
                        loaded_names.append(d['name'])
                        dog_info_list.append(d)
                        print(f'Added dog breed : {d["name"]}')
                    else:
                        print(f'Dog breed already exists : {d["name"]}')
            else:
                break
    

print(dog_info_list)

with open('dog_info_updated.json', 'w') as json_file:
    json.dump(dog_info_list, json_file, indent=2)

print("Dog information has been written to dog_info_updated.json")

