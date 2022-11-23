import csv
from datetime import datetime
from typing import List
from sensor import Sensor, SensorData

# GLOBALS
SKIP_COLUMNS = 3
FILE_PATH = "./HDE-INT-MOT-20221028-01_HT8_03_N85z-4_OC2_50Hz_70C_R_000759_221107_100743.GEV.csv"


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
