#read labels.txt and store in list
import requests
import json

with open('labels.txt') as f:
    breeds = f.read().splitlines()

# print(breeds)
breeds=['labradoodle']


dog_info_list = []
for dog_breed in breeds:
    api_url = 'https://api.api-ninjas.com/v1/dogs?name={}'.format(dog_breed)
    # print(api_url)
    response = requests.get(api_url, headers={'X-Api-Key': 'OeclnfZ3nbQxgF6yH03Acg==0zJ1dL8aWoYWJ50H'})
    if response.status_code == 200:
        dog_info = response.json()
        if len(dog_info) == 0:
            print(f'No dog breeds : {dog_breed}')
        dog_info_list.append(dog_info)
    

print(dog_info_list)

# with open('dog_info.json', 'w') as json_file:
#     json.dump(dog_info_list, json_file, indent=2)

# print("Dog information has been written to dog_info.json")


