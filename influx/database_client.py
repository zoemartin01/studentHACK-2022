from influxdb import InfluxDBClient

client = InfluxDBClient(
    host="localhost",
    port="8086",
    username="root",
    password="root",
)
