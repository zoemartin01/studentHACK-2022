package de.hermetic.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class DataContainer {

    @JsonProperty("channel_name")
    private String channelName;

    @JsonProperty("tag_comment")
    private String tagComment;

    @JsonProperty("tag_no")
    private String tagNo;

    @JsonProperty("unit")
    private String unit;

    @JsonProperty("data")
    private DataPoint[] data;

    @Data
    @NoArgsConstructor
    public static class DataPoint {
        private float value;
        private String datetime;
    }
}
