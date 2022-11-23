import csv
from datetime import datetime
from typing import List


class SensorData:
    value: str
    datetime: datetime

    def __init__(self, value: float, date: str, time: str):
        self.value = value
        self.datetime = datetime.strptime(f"{date} {time}", "%Y/%m/%d %H:%M:%S")

    def __repr__(self):
        return f"SensorData(value={self.value}, datetime={self.datetime})"


class Sensor:
    channel_name: str
    tag_comment: str = ""
    tag_no: str = ""
    unit: str = ""
    data: List[SensorData] = []

    def __init__(self, channel_name: str):
        self.channel_name = channel_name
        self.data = []

    def __repr__(self):
        return f"Sensor: {self.channel_name}, Tag: {self.tag_no}, Comment: {self.tag_comment}, Unit: {self.unit}"


sensors: List[Sensor] = []

skip_columns = 3


with open(
    "./HDE-INT-MOT-20221028-01_HT8_03_N85z-4_OC2_50Hz_70C_R_000759_221107_100743.GEV.csv"
) as csvfile:
    readCSV = csv.reader(csvfile, delimiter=",")
    line_count = 0

    for row in readCSV:
        # read channel names
        if line_count == 26:
            for idx, name in enumerate(row[skip_columns:]):
                sensors.append(Sensor(name))

        # read tag comments
        if line_count == 27:
            for idx, tag_comment in enumerate(row[skip_columns:]):
                sensors[idx].tag_comment = tag_comment

        # read tag numbers
        if line_count == 28:
            for idx, tag_no in enumerate(row[skip_columns:]):
                sensors[idx].tag_no = tag_no

        # read units
        if line_count == 29:
            for idx, unit in enumerate(row[skip_columns:]):
                sensors[idx].unit = unit

        # read data
        if line_count > 29:
            date = row[0]
            time = row[1]

            for idx, value in enumerate(row[skip_columns:]):
                sensors[idx].data.append(SensorData(value.strip(), date, time))

        line_count += 1

print(sensors)
