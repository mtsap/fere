import { readFileSync } from "fs";
import { Command } from "commander";
import { match, P } from "ts-pattern";
import yaml from "js-yaml";
import { AxiosRequestConfig } from "axios";
import { mapToRequests } from "./requestHandling";
import { encase } from "./utils";

function renderResults(responses: any) {
  responses.then((res: any) => {
    const output = res.map((r: any) => {
      return {
        status: r.status,
        data: r.data,
        headers: r.headers,
      };
    });
    console.log(output);
  });
}

async function main() {
  const readFile = encase(readFileSync);
  const parseYaml = encase(yaml.load);

  const program = new Command();
  program
    .name("fere")
    .description("Run http requests from yaml files")
    .version("1.0.0")
    .option("--file, -f <filename>", "request file")
    .action((str, options) => {
      const result = readFile(str.F, "utf8")
        .andThen((data) => parseYaml(data as string))
        .andThen((requests) => mapToRequests(requests as AxiosRequestConfig[]));

      match(result)
        .with({ ok: true }, (result) => {
          renderResults(result.val);
        })
        .with({ ok: false }, (result) => {
          console.error(result.val);
        })
        .exhaustive();
    });

  program.parse();
}

main();
