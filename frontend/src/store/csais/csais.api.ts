import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TRQ_token, TRQ_login } from "../../types/csais.types";

export const csaisApi = createApi({
    reducerPath: "csais/api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/',
    }),
    endpoints: build => ({

        auth: build.mutation({
            query: ({ login, password }: TRQ_login) => ({
                url: "auth/login",
                method: "POST",
                body: {
                    login, password
                }
            }),

        }),

        authToken: build.mutation({
            query: (data) => ({
                url: "auth/token",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + data.token
                }
            })
        }),

        accessesGroups: build.query({
            query: (data: TRQ_token) => ({
                url: "groups/accesses",
                method: "GET",
                headers: {
                    Authorization: "Bearer " + data.token
                }
            })
        }),

    })
})

export const { useAuthMutation, useAuthTokenMutation } = csaisApi;