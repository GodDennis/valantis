import { ResponseIds, ResponseItems } from "@/types/types";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { md5 } from "js-md5";

const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const password = `Valantis_${timestamp}`;

export const productsApi = createApi({
    reducerPath: "baseApi",
    baseQuery: retry(
        fetchBaseQuery({
            baseUrl: "http://api.valantis.store:40000/",
            headers: {
                "X-Auth": md5(password),
            },
        }),
        { maxRetries: 5 }
    ),
    endpoints: builder => {
        return {
            getIds: builder.mutation<ResponseIds, number>({
                query: offset => ({
                    url: ``,
                    method: "POST",
                    body: {
                        action: "get_ids",
                        params: { offset, limit: 5 },
                    },
                }),
            }),
            getItems: builder.mutation<ResponseItems, string[]>({
                query: ids => ({
                    url: ``,
                    method: "POST",
                    body: {
                        action: "get_items",
                        params: { ids },
                    },
                }),
            }),
        };
    },
});

export const { useGetIdsMutation, useGetItemsMutation } = productsApi;
