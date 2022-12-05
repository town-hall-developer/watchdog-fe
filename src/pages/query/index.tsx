import { Card, Tab, TabList } from "@tremor/react";
import React from "react";
import { ParseResponse, QueryResponse } from "../../utils/api";
import LogList from "./LogList";
import ParseInput from "./ParseInput";
import LogGeneral from "./LogGeneral";
import LogAnalysis from "./LogAnalysis";
import { SyncLoader } from "react-spinners";

const Query: React.FC = () => {
  const [input, setInput] = React.useState(
    'find({path~=/}["2021-12-01 11:12:21", "2023-12-31 01:45:12"], nginx)'
  );
  const [parseResult, setParseResult] = React.useState<ParseResponse>();
  const [queryResult, setQueryResult] = React.useState<QueryResponse[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [selectedView, setSelectedView] = React.useState(1);

  return (
    <Card marginTop="mt-6" hFull={false}>
      <ParseInput
        input={input}
        setInput={setInput}
        parseResult={parseResult}
        setParseResult={setParseResult}
        setQueryResult={setQueryResult}
        setLoading={setLoading}
      />

      <TabList
        defaultValue={1}
        handleSelect={(value) => setSelectedView(value)}
        marginTop="mt-6"
      >
        <Tab value={1} text="General" />
        <Tab value={2} text="List" />
        <Tab value={3} text="Analysis" />
      </TabList>

      {loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <SyncLoader
            style={{ opacity: 0.7 }}
            color={"#3b82f6"}
            loading={loading}
            size={70}
            margin={7}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div
            style={{
              color: "#7d7d7d",
              fontSize: "18px",
              marginTop: "10px",
            }}
          >
            Loading...
          </div>
        </div>
      )}
      {!loading &&
        selectedView === 1 &&
        queryResult &&
        queryResult.length > 0 && (
          <LogGeneral data={queryResult} parseResult={parseResult} />
        )}
      {!loading && selectedView === 2 && <LogList data={queryResult} />}
      {!loading && selectedView === 3 && <LogAnalysis data={queryResult} />}
    </Card>
  );
};

export default Query;
