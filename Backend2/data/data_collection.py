#read labels.txt and store in list
import requests
import json

# with open('labels.txt') as f:
#     breeds = f.read().splitlines()
# with open('dog_info.json', 'r') as file:
    # Load JSON data from the file
    # data = json.load(file)

# Now 'data' contains the contents of the JSON file as a Python dictionary

# loaded_dogs = [dog[0]['name'] for dog in data]
# print(loaded_dogs)
# print(breeds)
breeds=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

loaded_names =[]

dog_info_list = []
for dog_breed in breeds:
    api_url = 'https://api.api-ninjas.com/v1/dogs?name={}'.format(dog_breed)
    # print(api_url)
    response = requests.get(api_url, headers={'X-Api-Key': 'OeclnfZ3nbQxgF6yH03Acg==0zJ1dL8aWoYWJ50H'})
    if response.status_code == 200:
        dog_info = response.json()
        if len(dog_info) == 0:
            print(f'No dog breeds : {dog_breed}')
        
        for d in dog_info:
            if d['name'] not in loaded_names:
                loaded_names.append(d['name'])
                dog_info_list.append(d)
                print(f'Added dog breed : {d["name"]}')
            else:
                print(f'Dog breed already exists : {d["name"]}')
    

# print(dog_info_list)

with open('dog_info_updated.json', 'w') as json_file:
    json.dump(dog_info_list, json_file, indent=2)

print("Dog information has been written to dog_info_updated.json")

