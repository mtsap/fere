import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { encase } from "./utils";

function mapToRequestsHelper(
  requests: AxiosRequestConfig[],
): Promise<Array<AxiosResponse<unknown, any>>> {
  return Promise.all(requests.map((r) => axios(r)));
}

export const mapToRequests = encase(mapToRequestsHelper);
