/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Button, Modal, SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

import AgentActions from "./AgentActions";
import AgentConfig from "./AgentConfig";

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const styleModalAgentConfig: SxProps = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "whitesmoke",
  width: "700px",
  boxShadow: 24,
};

const tabsController = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

interface IProps {
  visible: boolean;
  hide: () => void;
}

export default function NewAgentModal({ visible, hide }: IProps) {
  const [auxIndexTab, setAuxIndexTab] = useState(0);

  const handleChangeIndexTab = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setAuxIndexTab(newValue);
  };

  const handleAddAgentConfig = () => {
    hide();
  };

  return (
    <Modal
      open={visible}
      onClose={hide}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={styleModalAgentConfig}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "100%",
          }}
        >
          <Typography variant="h5" marginY={3} marginX={3}>
            New agent
          </Typography>
          <Tabs
            value={auxIndexTab}
            onChange={handleChangeIndexTab}
            sx={{ width: "100%" }}
          >
            <Tab
              sx={{ width: "50%" }}
              label="Agent configuration"
              {...tabsController(0)}
            />
            <Tab
              sx={{ width: "50%" }}
              label="Agent actions"
              {...tabsController(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={auxIndexTab} index={0}>
          <AgentConfig />
        </TabPanel>
        <TabPanel value={auxIndexTab} index={1}>
          <AgentActions />
        </TabPanel>
        <Button
          sx={{ marginBottom: 3, marginLeft: 3, marginRight: 3 }}
          variant="contained"
          onClick={handleAddAgentConfig}
        >
          <AddIcon />
          Add new configuration
        </Button>
      </Box>
    </Modal>
  );
}
