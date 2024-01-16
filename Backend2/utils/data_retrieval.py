import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

db_config = {
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT'),
    'database': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
}

def get_breed_info(breed):
    
    try:     
        connection = psycopg2.connect(**db_config)
        cursor = connection.cursor()
        
        select_query = f"""
        SELECT * FROM dog_breeds WHERE name ILIKE '%{breed}%';
        """
        cursor.execute(select_query)
        
        breed_info = cursor.fetchone()
        
        if breed_info is None:
            return (f"No dog_breeds named {breed} found in the database.")
        else:
            return breed_info
        
    except (Exception, psycopg2.Error) as error:
        return (f"Error: {error}")
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
    
    
    
    