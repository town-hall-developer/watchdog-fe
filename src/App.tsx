import React from "react";
import "@tremor/react/dist/esm/tremor.css";
import logo from "./logo.png";
import { Subtitle, TabList, Tab } from "@tremor/react";
import Status from "./pages/status";
import Query from "./pages/query";

const App: React.FC = () => {
  const [selectedView, setSelectedView] = React.useState(1);

  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "40px",
        marginLeft: "40px",
        marginRight: "50px",
      }}
    >
      <div className="px-10 py-5">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src={logo} style={{ width: "90px" }} alt="watchdog-logo" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "17px",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontWeight: "bold" }}>WatchDog</div>
            <Subtitle>Progressive log monitoring service</Subtitle>
          </div>
        </div>

        <TabList
          defaultValue={1}
          handleSelect={(value) => setSelectedView(value)}
          marginTop="mt-6"
        >
          <Tab value={2} text="Status" />
          <Tab value={1} text="Query" />
        </TabList>

        {selectedView === 2 && <Status />}
        {selectedView === 1 && <Query />}
      </div>
    </div>
  );
};

export default App;
