from datetime import datetime
from typing import List
import json


class SensorData:
    value: float
    datetime: datetime

    def __init__(self, value: float, date: str, time: str):
        try:
            self.value = float(value)
        except ValueError:
            self.value = 0.0
        self.datetime = datetime.strptime(f"{date} {time}", "%Y/%m/%d %H:%M:%S")

    def __repr__(self):
        return f"SensorData(value={self.value}, datetime={self.datetime})"

    def toJSON(self):
        return {"value": self.value, "datetime": self.datetime.isoformat()}


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
        return (
            f"Sensor: {self.channel_name}, Tag: {self.tag_no}, "
            f"Comment: {self.tag_comment}, Unit: {self.unit}"
        )

    def to_influx(
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

    def toJSON(self):
        return {
            "channel_name": self.channel_name,
            "tag_comment": self.tag_comment,
            "tag_no": self.tag_no,
            "unit": self.unit,
            "data": [data.toJSON() for data in self.data],
        }
