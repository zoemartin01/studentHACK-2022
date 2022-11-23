import {createStyles, Group, Navbar, Text, ThemeIcon, UnstyledButton} from '@mantine/core';
import {AlertIcon, CloudIcon, DatabaseIcon, InfoIcon, LightBulbIcon,} from '@primer/octicons-react';
import { PageSelection } from "src/PageSelection";
import { Dispatch, SetStateAction } from "react";

interface MainLinkProps {
    icon: React.ReactNode;
    color: string;
    label: string;
    set: Dispatch<SetStateAction<string>>;
    selection: string;
}

const useStyles = createStyles((theme) => ({
    button: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
}));

function MainLink({ icon, color, label, set, selection }: MainLinkProps) {
    const { classes } = useStyles();

    return (
        <UnstyledButton className={classes.button} onClick={() => set(selection)}>
            <Group>
                <ThemeIcon color={color} variant="light">
                    {icon}
                </ThemeIcon>

                <Text size="sm">{label}</Text>
            </Group>
        </UnstyledButton>
    );
}

const data = [
    { icon: <CloudIcon />, color: 'blue', label: 'Predictive Maintenance', selection: PageSelection.maintenance },
    { icon: <AlertIcon />, color: 'yellow', label: 'Problem Recognition', selection: PageSelection.problem },
    { icon: <LightBulbIcon />, color: 'green', label: 'Live Data', selection: PageSelection.live },
    { icon: <DatabaseIcon />, color: 'grape', label: 'Historical Metrics', selection: PageSelection.historical },
];

function MainLinks({ setPage }: {setPage:  Dispatch<SetStateAction<string>>}) {
    const links = data.map((link) => <MainLink {...link} set={setPage} key={link.label} />);
    return <div>{links}</div>;
}

export default function NavbarContent({ setPage }: {setPage:  Dispatch<SetStateAction<string>>}) {
    return <>

    </>
}
