package de.hermetic.system;

import de.hermetic.PortConfig;
import de.hermetic.data.Sheesh;
import io.javalin.Javalin;
import lombok.RequiredArgsConstructor;

import javax.swing.*;
import java.awt.*;

@RequiredArgsConstructor
public class PumpMetricsService implements Runnable {

    private final PortConfig portConfig;

    @Override
    public void run() {
        JFrame frame = new JFrame("S-MetricsService");
        frame.getContentPane().setLayout(new BorderLayout());
        JLabel jLabel = new JLabel("S-MetricsService");
        jLabel.setFont(jLabel.getFont().deriveFont(20.0F));
        frame.getContentPane().add(jLabel, BorderLayout.CENTER);
        JButton button = new JButton("Start Simulation");
        button.addActionListener(e -> SwingUtilities.invokeLater(Sheesh::startStreaming));
        JButton button2 = new JButton("STOP");
        button2.addActionListener(e -> SwingUtilities.invokeLater(Sheesh::stopStreaming));

        Box verticalBox = Box.createVerticalBox();
        verticalBox.add(button);
        verticalBox.add(button2);

        frame.getContentPane().add(verticalBox, BorderLayout.SOUTH);
        frame.getContentPane().add(Box.createHorizontalStrut(20), BorderLayout.WEST);

        frame.setSize(400, 200);
        frame.setVisible(true);
    }
}
