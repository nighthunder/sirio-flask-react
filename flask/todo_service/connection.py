from mysql.connector import connect, Error
from dotenv import load_dotenv

# Make the connection
host = os.getenv('DATABASE_URL')
user = os.getenv('DATABASE_USER')
passwd = os.getenv('DATABASE_PASSWD')
database = os.getenv('DATABASE_DB')

def get_db_connection():
    try:
        with connect(
            host=host,
            user=user,
            password=passwd,
            database=db,
            connect_timeout=300000
        ) as connection:
            print(connection)
    except Error as e:
        print(e)

get_db_connection()
