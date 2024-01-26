import json

# with open('dog_info.json', 'r') as file:
#     # Load JSON data from the file
#     data = json.load(file)

# # Now 'data' contains the contents of the JSON file as a Python dictionary

# loaded_dogs = [dog[0]['name'] for dog in data]
# # print(loaded_dogs)

with open("dog_info_updated.json",'r') as file2:
    big_data = json.load(file2)
    
big_data = sorted(big_data, key=lambda x: x['name'])


# big_data = list(set(big_data))
# big_data_names = [dog['name'] for dog in big_data]
# print(big_data_names)
with open('all_dogs_info.json', 'w') as json_file:
    json.dump(big_data, json_file, indent=2)