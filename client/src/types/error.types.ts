import { AxiosError } from "axios";

export type ResponseError = AxiosError<Record<string, any>>;
