from mysql.connector import connect, Error

host = "grafothinker.com.br"
user = "grafot76_flymaya"
passwd = "vD92J0J#5Pcb"
db = "grafot76_sirio"

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
