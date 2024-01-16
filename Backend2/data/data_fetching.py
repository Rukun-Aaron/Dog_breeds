import psycopg2

# Replace these with your actual database connection details
db_config = {
    'host': 'localhost',  # Change if your database is hosted elsewhere
    'database': 'dog_info',
    'user': 'rukun',
    'password': 'veitChi@5',
}

def retrieve_afghan_hound_info(cursor):
    # SQL command to retrieve information about Afghan Hound
    select_query = """
        SELECT * FROM dog_breeds WHERE name = 'Afghan Hound';
    """
    cursor.execute(select_query)

    # Fetch the result
    afghan_hound_info = cursor.fetchone()

    return afghan_hound_info

def main():
    # Connect to the PostgreSQL database
    try:
        connection = psycopg2.connect(**db_config)
        cursor = connection.cursor()

        # Retrieve information about Afghan Hound
        afghan_hound_info = retrieve_afghan_hound_info(cursor)

        if afghan_hound_info:
            print("Information about Afghan Hound:")
            print(afghan_hound_info)
        else:
            print("Afghan Hound not found in the database.")

    except (Exception, psycopg2.Error) as error:
        print(f"Error: {error}")

    finally:
        if connection:
            cursor.close()
            connection.close()

if __name__ == "__main__":
    main()
