import { SetStateAction, useState } from "react";
import {
  AppShell,
  Burger,
  createStyles,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  ThemeIcon,
  UnstyledButton,
  Badge,
  useMantineTheme,
} from "@mantine/core";
import { NextPage } from "next";

import Logo from "./Logo";
import {
  AlertIcon,
  CloudIcon,
  DatabaseIcon,
  InfoIcon,
  LightBulbIcon,
} from "@primer/octicons-react";
import DashboardPage from "./page/DashboardPage";
import MaintenancePage from "./page/MaintenancePage";
import ProblemPage from "./page/ProblemPage";
import LivePage from "./page/LivePage";
import HistoricalPage from "./page/HistoricalPage";

// @ts-ignore
const Shell: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(<DashboardPage />);
  const theme = useMantineTheme();

  const setPage1 = (x: SetStateAction<JSX.Element>) => {
    setPage(x);
    setOpened(false);
  };

  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      padding="md"
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={
        <Navbar
          p="xs"
          // Breakpoint at which navbar will be hidden if hidden prop is true
          hiddenBreakpoint="sm"
          // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
          hidden={!opened}
          // when viewport size is less than theme.breakpoints.sm navbar width is 100%
          // viewport size > theme.breakpoints.sm – width is 300px
          // viewport size > theme.breakpoints.lg – width is 400px
          width={{ sm: 300, lg: 400 }}
        >
          <Navbar.Section grow>
            <MainLink
              icon={<InfoIcon />}
              color={"pink"}
              label={"Dashboard"}
              onClick={() => setPage1(<DashboardPage />)}
            />
            <MainLink
              icon={<CloudIcon />}
              color={"blue"}
              label={"Predictive Maintenance"}
              onClick={() => setPage1(<MaintenancePage />)}
            />
            <MainLink
              icon={<AlertIcon />}
              color={"yellow"}
              label={"Problem Recognition"}
              onClick={() => setPage1(<ProblemPage />)}
            />
            <MainLink
              icon={<LightBulbIcon />}
              color={"green"}
              label={"Live Data"}
              onClick={() => setPage1(<LivePage />)}
            />
            <MainLink
              icon={<DatabaseIcon />}
              color={"grape"}
              label={"Historical Data"}
              onClick={() => setPage1(<HistoricalPage />)}
            />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="xs">
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Logo />
          </div>
        </Header>
      }
    >
      {page}
    </AppShell>
  );
};

const useStyles = createStyles((theme) => ({
  button: {
    display: "block",
    width: "100%",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: any;
  onClick: () => any;
}

function MainLink({ icon, color, label, onClick }: MainLinkProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.button} onClick={onClick}>
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

export default Shell;
