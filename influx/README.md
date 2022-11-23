## Start Grafana Container
```bash
$ docker run -d \
  --name grafana \
  -p 3003:3003 \
  -p 3004:8083 \
  -p 8086:8086 \
  -v $PWD/influxdb:/var/lib/influxdb \
  -v $PWD/grafana:/var/lib/grafana \
  philhawthorne/docker-influxdb-grafana:latest
```

https://hub.docker.com/r/philhawthorne/docker-influxdb-grafana/

`$ docker start/stop grafana`

## Add InfluxDB as a Data Source
Input Source Name: `pump1`, host: `localhost:8086`, database: `pump1`, username/password: `root`
Input Source Name: `pump2`, host: `localhost:8086`, database: `pump2`, username/password: `root`

## Import Test Data
```bash
$ cd influx
$ python3 -m venv venv
$ python3 -m pip install influxdb
$ python3 -m pip install numpy
$ python3 -m pip install scikit-learn
$ python3 main.py
```