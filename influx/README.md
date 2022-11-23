```bash
$ docker run -d \
  --name docker-influxdb-grafana \
  -p 3003:3003 \
  -p 3004:8083 \
  -p 8086:8086 \
  -v $PWD/influxdb:/var/lib/influxdb \
  -v $PWD/grafana:/var/lib/grafana \
  philhawthorne/docker-influxdb-grafana:latest
```

https://hub.docker.com/r/philhawthorne/docker-influxdb-grafana/

`$ docker start/stop docker-influxdb-grafana`