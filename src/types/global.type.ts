import { SerializedError } from "@reduxjs/toolkit";
import { BaseQueryApi, DefinitionType } from "@reduxjs/toolkit/query";
import { Key } from "react";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  meta?: TMeta;
  error?: TError;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | Key;
};

export type TRes =
  | {
      data: any;
      error?: undefined;
    }
  | {
      data?: undefined;
      error: DefinitionType | SerializedError;
    }
  | any;
