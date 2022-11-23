from parse import parse_csv_file, FILE_PATH
from database_client import client

sensors = parse_csv_file(FILE_PATH)

client.drop_database("pump_sensors")
client.create_database("pump_sensors")
for sensor in sensors:
    client.write_points(sensor.as_points())
