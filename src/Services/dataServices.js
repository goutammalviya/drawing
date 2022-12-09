import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { trainingData } from "../Redux/dataSlice.js";

export const dataService = createApi({
  reducerPath: "dataService",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    postVendorForm: builder.mutation({
      query: function (data) {
        return {
          url: "",
          method: "POST",
          body: data
        };
      }
    }),
  })
});


export const {
  usePostVendorFormMutation,
} = dataService;
