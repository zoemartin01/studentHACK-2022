import csv
from datetime import datetime
from typing import List

# GLOBALS
SKIP_COLUMNS = 3
FILE_PATH = "./HDE-INT-MOT-20221028-01_HT8_03_N85z-4_OC2_50Hz_70C_R_000759_221107_100743.GEV.csv"


class SensorData:
    value: str
    datetime: datetime

    def __init__(self, value: float, date: str, time: str):
        try:
            self.value = float(value)
        except ValueError:
            self.value = 0
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

    def as_points(
        self,
    ):
        return [
            {
                "measurement": self.channel_name,
                "tags": {
                    "comment": self.tag_comment,
                    "tag_no": self.tag_no,
                    "unit": self.unit,
                },
                "time": sensor_data.datetime.strftime("%Y-%m-%dT%H:%M:%SZ"),
                "fields": {
                    "value": sensor_data.value,
                },
            }
            for sensor_data in self.data
        ]


def parse_csv_file(file_path: str) -> List[Sensor]:
    sensors: List[Sensor] = []

    print(f"Processing file: {file_path}")

    with open(file_path) as csvfile:
        readCSV = csv.reader(csvfile, delimiter=",")
        line_count = 0

        for row in readCSV:
            # read channel names
            if line_count == 26:
                for idx, name in enumerate(row[SKIP_COLUMNS:]):
                    sensors.append(Sensor(name))

            # read tag comments
            if line_count == 27:
                for idx, tag_comment in enumerate(row[SKIP_COLUMNS:]):
                    sensors[idx].tag_comment = tag_comment

            # read tag numbers
            if line_count == 28:
                for idx, tag_no in enumerate(row[SKIP_COLUMNS:]):
                    sensors[idx].tag_no = tag_no

            # read units
            if line_count == 29:
                for idx, unit in enumerate(row[SKIP_COLUMNS:]):
                    sensors[idx].unit = unit

            # read data
            if line_count > 29:
                date = row[0]
                time = row[1]

                for idx, value in enumerate(row[SKIP_COLUMNS:]):
                    sensors[idx].data.append(SensorData(value.strip(), date, time))

            line_count += 1

        print("Processing finished.")

    return sensors
