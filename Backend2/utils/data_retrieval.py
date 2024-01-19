import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

labels = [
    "id", "image_link", "good_with_children", "good_with_other_dogs",
    "shedding", "grooming", "drooling", "coat_length",
    "good_with_strangers", "playfulness", "protectiveness",
    "trainability", "energy", "barking", "min_life_expectancy",
    "max_life_expectancy", "max_height_male", "max_height_female",
    "max_weight_male", "max_weight_female", "min_height_male",
    "min_height_female", "min_weight_male", "min_weight_female",
    "name"
]
db_config = {
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT'),
    'database': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
}

def get_breed_info(breed):

    return_breed_info = list()
    try:     
        connection = psycopg2.connect(**db_config)
        cursor = connection.cursor()
        
        select_query = f"""
        SELECT * FROM dog_breeds WHERE name ILIKE '%{breed}%';
        """
        cursor.execute(select_query)
        
        data = cursor.fetchall()
        breed_info=None
        for row in data:
            
            breed_info = dict(zip(labels, row))
            return_breed_info.append(breed_info)

        if breed_info is None:
            return (f"No dog_breeds named {breed} found in the database.")
        else:
            return return_breed_info
        
    except (Exception, psycopg2.Error) as error:
        return (f"Error: {error}")
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
    
    
def get_all_breeds():
    cursor = None
    connection = None
    
    try:
        connection = psycopg2.connect(**db_config)
        cursor = connection.cursor()
        
        select_query = """
        SELECT name FROM dog_breeds;
        """
        cursor.execute(select_query)
        breeds = cursor.fetchall()  
        
        return breeds
    
    except (Exception, psycopg2.Error) as error:
        
        print(f"Error: {error}")
        return []
    
    finally:
        if connection:
            connection.close()
        if cursor:
            cursor.close()    

