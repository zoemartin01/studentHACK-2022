package de.hermetic.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.hermetic.types.Pump;
import de.hermetic.types.PumpState;
import lombok.Getter;
import lombok.SneakyThrows;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ScheduledFuture;

/**
 * S ehr
 * h igh-tech
 * e dle und
 * e hrenwerte
 * s aubere
 * h urensohn-Datenverwaltung
 */
public class Sheesh {

    private static final List<Pump> pumps = new ArrayList<>();

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Getter
    private static boolean isStreaming = false;

    public static final int SLIP_POS = 23;
    public static final int CURRENT_POS = 17;
    public static final int WINDING_W_POS = 7;

    @Getter
    private static DataContainer[] cleanData;

    @Getter
    private static DataContainer[] noisyData;

    static {
        pumps.add(new Pump("hermetic1", "Hermetic", "pump1", PumpState.FULLY_OPERATIONAL));
        pumps.add(new Pump("studentec2", "studentec", "pump2", PumpState.FULLY_OPERATIONAL));
    }

    public static List<Pump> getPumps() {
        return pumps;
    }

    public static void loadData() {
        try {
            cleanData = loadFile("clean.json");
            noisyData = loadFile("noisy 2.json");

            for (int i = 0; i < cleanData.length; i++) {
                System.out.println(i + " :: " + cleanData[i].getChannelName() + " - " + cleanData[i].getTagComment());
            }

        } catch (IOException exception) {
            throw new IllegalStateException(exception);
        }
    }

    @SneakyThrows
    public static String getDataPointJSON(DataContainer[] container, int counter, int... positions) {
        DataContainer.DataPoint[] points = new DataContainer.DataPoint[positions.length];
        for (int i = 0; i < positions.length; i++) {
            points[i] = container[positions[i]].getData()[counter];
        }

        String string = MAPPER.writeValueAsString(points);
        return string;
    }

    private static DataContainer[] loadFile(String path) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(new File(path), DataContainer[].class);
    }

    @SneakyThrows
    public static void startStreaming() {
        isStreaming = true;
        Thread.sleep(5000);
        isStreaming = false;
    }

    private static final List<ScheduledFuture<?>> futures = new ArrayList<>();

    public static synchronized void addStream(ScheduledFuture<?> future) {
        futures.add(future);
    }

    public static synchronized void stopStreaming() {
        isStreaming = false;
        futures.forEach(future -> {
            future.cancel(true);
            futures.remove(future);
        });
    }

}
