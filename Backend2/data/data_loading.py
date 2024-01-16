import json
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv
import os

load_dotenv()

db_config = {
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT'),
    'database': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
}

# Path to your dog_info.json file
json_file_path = 'dog_info.json'

def create_table(cursor): 
    # SQL command to create the table
    create_table_query = """
        CREATE TABLE IF NOT EXISTS dog_breeds (
            id SERIAL PRIMARY KEY,
            image_link VARCHAR(255),
            good_with_children INTEGER,
            good_with_other_dogs INTEGER,
            shedding INTEGER,
            grooming INTEGER,
            drooling INTEGER,
            coat_length INTEGER,
            good_with_strangers INTEGER,
            playfulness INTEGER,
            protectiveness INTEGER,
            trainability INTEGER,
            energy INTEGER,
            barking INTEGER,
            min_life_expectancy FLOAT,
            max_life_expectancy FLOAT,
            max_height_male FLOAT,
            max_height_female FLOAT,
            max_weight_male FLOAT,
            max_weight_female FLOAT,
            min_height_male FLOAT,
            min_height_female FLOAT,
            min_weight_male FLOAT,
            min_weight_female FLOAT,
            name VARCHAR(255)
        );
    """
    cursor.execute(create_table_query)

def insert_data(cursor, data):
    # SQL command to insert data into the table
    insert_query = sql.SQL("""
        INSERT INTO dog_breeds (
            image_link, good_with_children, good_with_other_dogs,
            shedding, grooming, drooling, coat_length,
            good_with_strangers, playfulness, protectiveness,
            trainability, energy, barking, min_life_expectancy,
            max_life_expectancy, max_height_male, max_height_female,
            max_weight_male, max_weight_female, min_height_male,
            min_height_female, min_weight_male, min_weight_female,
            name
        ) VALUES (
            %(image_link)s, %(good_with_children)s, %(good_with_other_dogs)s,
            %(shedding)s, %(grooming)s, %(drooling)s, %(coat_length)s,
            %(good_with_strangers)s, %(playfulness)s, %(protectiveness)s,
            %(trainability)s, %(energy)s, %(barking)s, %(min_life_expectancy)s,
            %(max_life_expectancy)s, %(max_height_male)s, %(max_height_female)s,
            %(max_weight_male)s, %(max_weight_female)s, %(min_height_male)s,
            %(min_height_female)s, %(min_weight_male)s, %(min_weight_female)s,
            %(name)s
        )
    """)

    # Insert each record into the database
    for breed_list in data:
        for record in breed_list:
            cursor.execute(insert_query, record)

def main():
    # Connect to the PostgreSQL database
    try:
        connection = psycopg2.connect(**db_config)
        cursor = connection.cursor()

        # Read data from the JSON file
        with open(json_file_path, 'r') as json_file:
            data = json.load(json_file)
        print(data)
        # Create the table if it doesn't exist
        create_table(cursor)

        # Insert data into the table
        insert_data(cursor, data)

        # Commit the changes and close the connection
        connection.commit()

    except (Exception, psycopg2.Error) as error:
        print(f"Error: {error}")

    finally:
        if connection:
            cursor.close()
            connection.close()

if __name__ == "__main__":
    main()
