import React from "react";
import {
  ParseResponse,
  postParse,
  postQuery,
  QueryResponse,
} from "../../utils/api";
import { Button, Card, Metric, Subtitle, Text } from "@tremor/react";
import ParseBadge from "./ParseBadge";
import { CircleStackIcon } from "@heroicons/react/24/solid";
import { verifyField } from "../../utils/util";

interface ParseInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  parseResult?: ParseResponse;
  setParseResult: React.Dispatch<
    React.SetStateAction<ParseResponse | undefined>
  >;
  setQueryResult: React.Dispatch<React.SetStateAction<QueryResponse[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const ParseInput: React.FC<ParseInputProps> = ({
  input,
  setInput,
  parseResult,
  setParseResult,
  setQueryResult,
  setLoading,
}) => {
  const verifyAllField = (
    field:
      | { key: string; value: string; operator: "=" | "=!" | "=~" }[]
      | undefined
  ): boolean => {
    let result = true;
    if (field)
      // eslint-disable-next-line
      field.map((item) => {
        if (!verifyField(item.key)) {
          result = false;
        }
      });

    return result;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
      <div
        style={{
          width: "100%",
          fontSize: "15px",
          fontWeight: "300",
          paddingLeft: "4px",
          color: "#6b7280",
          opacity: 0.7,
          outline: "none",
        }}
      >
        {
          'ex) find({path~=/}["2021-12-01 11:12:21", "2023-12-31 01:45:12"], nginx)'
        }
      </div>
      <input
        placeholder="Input Query..."
        style={{
          width: "100%",
          height: "40px",
          fontSize: "17px",
          borderRadius: "7px",
          borderWidth: "2px",
          borderColor: "#e5e7eb",
          color: "#6b7280",
          marginTop: "7px",
          paddingLeft: "8px",
          outline: "none",
        }}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            postParse(input, setLoading).then((r) => setParseResult(r));
          }
        }}
      />
      <Card
        maxWidth="max-w-none"
        hFull={false}
        shadow={true}
        decoration="left"
        decorationColor={
          parseResult
            ? parseResult.status === "success"
              ? "green"
              : "red"
            : "blue"
        }
        marginTop="mt-2"
      >
        <Text>Result</Text>
        <Metric>
          {!parseResult && "None"}
          {parseResult && <div>{parseResult.status}</div>}
          <Subtitle>
            {parseResult?.status === "fail" &&
              parseResult?.errors?.map((item, index) => {
                return (
                  <>
                    <div
                      key={Math.random()}
                      style={{
                        fontWeight: "bold",
                        marginTop: "5px",
                        color: "#7d7d7d",
                      }}
                    >
                      {index + 1 + ". " + item.error}
                    </div>
                  </>
                );
              })}
          </Subtitle>
        </Metric>
        {parseResult?.status === "success" && (
          <ParseBadge
            condition={parseResult?.condition}
            datasource={parseResult.datasource}
          />
        )}
        <Button
          text="SELECT FROM LOGS"
          icon={CircleStackIcon}
          iconPosition="left"
          size="sm"
          color="blue"
          importance="primary"
          handleClick={() => {
            postParse(input, setLoading).then((r) => setParseResult(r));
            if (parseResult?.status === "success") {
              postQuery(input, setLoading).then((r) => setQueryResult(r));
            }
          }}
          disabled={
            parseResult?.status !== "success" ||
            !verifyAllField(parseResult.condition?.field)
          }
          marginTop="mt-4"
        />
      </Card>
    </div>
  );
};
export default ParseInput;
