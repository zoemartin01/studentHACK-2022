from parse import parse_csv_file, FILE_PATH
from database_client import client
from sensor import Sensor, SensorData
from typing import List
import numpy as np
import scipy
from sklearn.preprocessing import MinMaxScaler
import random


sensors = parse_csv_file(FILE_PATH)
pumps = ["pump1", "pump2"]


def recreate_database(database: str):
    client.drop_database(database)
    client.create_database(database)


for pump in pumps:
    recreate_database(pump)

for sensor in sensors:
    client.write_points(sensor.to_influx(), database=pumps[0])


# introduce random noise into sensor data
def add_noise(sensors: List[Sensor]):
    def cavitation_noise(interval_start: int, interval_end: int, sensor: Sensor):
        interval: SensorData = sensor.data[interval_start:interval_end]

        noise = np.random.normal(0.3, 0.05, 1)

        def sigmoid(x):
            return 1 / (1 + np.exp(-x))

        down_interval = interval[: len(interval) // 2]
        up_interval = interval[len(interval) // 2 :]

        # down phase
        for idx, sensor_data in enumerate(down_interval):
            sensor_data.value = (
                sensor_data.value - sigmoid(idx - 6) * noise[0] * sensor_data.value
            )

        # up phase
        for idx, sensor_data in enumerate(up_interval):
            sensor_data.value = (
                down_interval[-1].value + sigmoid(idx - 6) * 0.05 * sensor_data.value
            )

    def convolve(interval_start: int, interval_end: int, sensors: (Sensor, Sensor)):
        interval1: SensorData = sensors[0].data[interval_start:interval_end]
        interval2: SensorData = sensors[1].data[interval_start:interval_end]

        x = np.linspace(0, len(interval1), len(interval1))
        y = np.convolve(
            np.random.randint(0, 100) * np.sin(np.random.rand() / 20 * x),
            np.random.randint(0, 100) * np.cos(np.random.rand() / 20 * x),
            "same",
        )
        y = (
            MinMaxScaler(feature_range=(-1, 1))
            .fit_transform(y.reshape(-1, 1))
            .reshape(-1)
        )

        for idx in range(len(interval1)):
            interval1[idx].value = (y[idx] * 0.15 + 1) * interval1[idx].value
            interval2[idx].value = 1 / (y[idx] * 0.15 + 1) * interval2[idx].value

    # choose 8 to 12 random intervals to add noise to
    for _ in range(np.random.randint(8, 12)):
        interval_start = np.random.randint(0, len(sensors[0].data) - 100)
        interval_end = interval_start + np.random.randint(50, 100)
        for sensor in sensors:
            cavitation_noise(interval_start, interval_end, sensor)

    for _ in range(np.random.randint(8, 12)):
        convolve(
            200,
            len(sensors[0].data),
            (
                next(x for x in sensors if x.channel_name == "CHC003"),
                next(x for x in sensors if x.channel_name == "CHC009"),
            ),
        )


add_noise(sensors)
for sensor in sensors:
    client.write_points(sensor.to_influx(), database=pumps[1])
