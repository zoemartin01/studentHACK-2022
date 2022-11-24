import { Grid, Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export default function() {

    return (
        <>
            <Grid>
                <Grid.Col span={6}>
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Card.Section>
                            <Image
                                src="https://cdn.prod.www.spiegel.de/images/907a4542-4dd1-4c6a-b7c7-09c249aa38b6_w991_r1_fpx36.83_fpy49.95.jpg"
                                height={160}
                                alt="Norway"
                            />
                        </Card.Section>

                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>Motor current frequency spectrum</Text>
                            <Badge color="green" variant="light">
                                Available
                            </Badge>
                        </Group>

                        <Text size="sm" color="dimmed">
                            Feel even more secure with in depth analysis of your pumps motor voltage frequency spectrums.
                        </Text>

                        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                            Analyze now!
                        </Button>
                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Card.Section>
                            <Image
                                src="https://media.istockphoto.com/id/533610989/de/foto/dies-ist-zu-laut.jpg?s=612x612&w=0&k=20&c=UWEIh7bNRO60fmGLyT8ktzlxUcXPYwVNO9zhdZ7p1uQ="
                                height={160}
                                alt="Norway"
                            />
                        </Card.Section>

                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>Noise level analysis</Text>
                            <Badge color="blue" variant="light">
                                In development
                            </Badge>
                        </Group>

                        <Text size="sm" color="dimmed">
                            Analyse the sound your pumps are producing!
                            This can lead to valuable info about asymmetries in the stator or the engine bearings.
                        </Text>

                        <Button variant="light" color="blue" fullWidth mt="md" radius="md" disabled>
                            Analyze now!
                        </Button>
                    </Card>
                </Grid.Col>
            </Grid>
            <Grid>
                <Grid.Col span={6}>
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Card.Section>
                            <Image
                                src="https://images.obi.de/product/SK/1500x1500/495078_1.jpg"
                                height={160}
                                alt="Norway"
                            />
                        </Card.Section>

                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>Analysis of pressure differentials</Text>
                            <Badge color="green" variant="light">
                                Available
                            </Badge>
                        </Group>

                        <Text size="sm" color="dimmed">
                            Pressure analysis can lead to important intel on when to switch filters, or when to change the pressure within the pump.
                        </Text>

                        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                            Analyze now!
                        </Button>
                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Card.Section>
                            <Image
                                src="https://pbs.twimg.com/media/EK3fKU_WwAAGuMH.jpg"
                                height={160}
                                alt="Norway"
                            />
                        </Card.Section>

                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>Pump specs out of bound notifications</Text>
                            <Badge color="yellow" variant="light">
                                Trial
                            </Badge>
                        </Group>

                        <Text size="sm" color="dimmed">
                            Notifies you if specs of the pump like the temperature, pressure or vibrations are out of the ordinary.
                        </Text>

                        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                            Test it now!
                        </Button>
                    </Card>
                </Grid.Col>
            </Grid>
        </>
    );
}