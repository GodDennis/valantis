import type { Filter, Ids, Items } from "@/types/types";
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
            getIds: builder.query<Ids, { offset: number; limit: number }>({
                query: params => ({
                    url: `/`,
                    method: "POST",
                    body: {
                        action: "get_ids",
                        params,
                    },
                }),
            }),
            getPaginationIds: builder.query<Ids, void>({
                query: () => ({
                    url: `/`,
                    method: "POST",
                    body: {
                        action: "get_ids",
                    },
                }),
            }),
            getItems: builder.query<Items, string[]>({
                query: ids => ({
                    url: `/`,
                    method: "POST",
                    body: {
                        action: "get_items",
                        params: { ids },
                    },
                }),
            }),

            getFields: builder.query<Omit<Items, "id">, void>({
                query: () => ({
                    url: `/`,
                    method: "POST",
                    body: {
                        action: "get_fields",
                        params: { field: "brand" },
                    },
                }),
            }),

            getFiltered: builder.query<Ids, Filter>({
                query: params => ({
                    url: `/`,
                    method: "POST",
                    body: {
                        action: "filter",
                        params,
                    },
                }),
            }),
        };
    },
});

export const {
    useGetIdsQuery,
    useGetItemsQuery,
    useGetFieldsQuery,
    useLazyGetFilteredQuery,
    useGetPaginationIdsQuery,
} = productsApi;
