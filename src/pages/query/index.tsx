import { Card, Tab, TabList } from "@tremor/react";
import React from "react";
import { ParseResponse, QueryResponse } from "../../utils/api";
import LogList from "./LogList";
import ParseInput from "./ParseInput";
import LogGeneral from "./LogGeneral";

const Query: React.FC = () => {
  const [input, setInput] = React.useState(
    'find({path~=/}["2021-11-01 11:12:21", "2023-12-31 01:45:12"], nginx)'
  );
  const [parseResult, setParseResult] = React.useState<ParseResponse>();
  const [queryResult, setQueryResult] = React.useState<QueryResponse[]>([]);

  const [selectedView, setSelectedView] = React.useState(1);

  return (
    <Card marginTop="mt-6" hFull={false}>
      <ParseInput
        input={input}
        setInput={setInput}
        parseResult={parseResult}
        setParseResult={setParseResult}
        setQueryResult={setQueryResult}
      />

      <TabList
        defaultValue={1}
        handleSelect={(value) => setSelectedView(value)}
        marginTop="mt-6"
      >
        <Tab value={1} text="General" />
        <Tab value={2} text="List" />
      </TabList>

      {selectedView === 1 &&
        queryResult &&
        (queryResult.length > 0 ? (
          <LogGeneral data={queryResult} parseResult={parseResult} />
        ) : (
          <></>
          /*parseResult && (
            <div style={{ width: "400px" }}>
              <Card marginTop="mt-6" decoration="top" decorationColor="amber">
                <Flex justifyContent="justify-start" spaceX="space-x-4">
                  <Icon
                    icon={ShieldExclamationIcon}
                    variant="light"
                    size="xl"
                    color="amber"
                  />
                  <Block truncate={true}>
                    <Text>Result</Text>
                    <Metric truncate={true}>Not Found</Metric>
                  </Block>
                </Flex>
              </Card>
            </div>
          )*/
        ))}
      {selectedView === 2 && <LogList data={queryResult} />}
    </Card>
  );
};

export default Query;
