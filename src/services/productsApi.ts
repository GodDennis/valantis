import type { Filter, Ids, Items } from "@/types/types";
import { FetchArgs, createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { md5 } from "js-md5";

const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const password = `Valantis_${timestamp}`;

const staggeredBaseQueryWithBailOut = retry(
    async (args: string | FetchArgs, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: "http://api.valantis.store:40000/",
            headers: {
                "X-Auth": md5(password),
            },
        })(args, api, extraOptions);
        if (result.error) {
            console.warn("status code:" + result.meta?.response?.status);
        }

        return result;
    },
    {
        maxRetries: 5,
    }
);

export const productsApi = createApi({
    reducerPath: "baseApi",
    baseQuery: staggeredBaseQueryWithBailOut,
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
