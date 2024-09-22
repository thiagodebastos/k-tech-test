import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// this is the base api that will be populated by @redux-query/codegen-api
export const emptySplitApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASEURL,
  }),
  tagTypes: ['User'],
  // endpoints will be injected here
  endpoints: () => ({}),
})

