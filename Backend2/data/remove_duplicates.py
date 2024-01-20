import psycopg2

from dotenv import load_dotenv
import os

load_dotenv()

db_config = {
    'host': os.getenv('DB_HOST'),
    'database': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
}

def remove_duplicate_entries(cursor):
    try:
        # Find duplicate names
        duplicate_query = """
            SELECT name
            FROM dog_breeds
            GROUP BY name
            HAVING COUNT(*) > 1;
        """
        cursor.execute(duplicate_query)
        duplicate_names = [record[0] for record in cursor.fetchall()]

        # Delete duplicates, keeping the entry with the lowest ID
        for name in duplicate_names:
            delete_query = f"""
                DELETE FROM dog_breeds
                WHERE name = %s
                AND id NOT IN (
                    SELECT MIN(id)
                    FROM dog_breeds
                    WHERE name = %s
                    GROUP BY name
                );
            """
            cursor.execute(delete_query, (name, name))

        # Commit the changes
        connection.commit()

    except (Exception, psycopg2.Error) as error:
        print(f"Error: {error}")

    finally:
        if connection:
            cursor.close()
            connection.close()

if __name__ == "__main__":
    try:
        # Connect to the PostgreSQL database
        connection = psycopg2.connect(**db_config)
        cursor = connection.cursor()

        # Remove duplicate entries
        remove_duplicate_entries(cursor)

    except (Exception, psycopg2.Error) as error:
        print(f"Error: {error}")

    finally:
        if connection:
            cursor.close()
            connection.close()