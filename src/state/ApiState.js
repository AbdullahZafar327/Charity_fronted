import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl : process.env.REACT_APP_BASE_URL}),
    reducerPath : "adminApi",
    //type of state for grabbing user
    tagTypes:["User", "Campaigns",'Donors',"Transactions","Geography","OverAllStat","Admin","Performance","Dashboard"],
    endpoints : (build) => ({
        getUser : build.query({
          query: (id) => `general/user/${id}`,
          providesTags: ["User"]
        }),
        getCampaigns : build.query({
          query : () => `client/campaigns`,
          providesTags : ['Campaigns']
        }),
        getDonors : build.query({
          query: () => `client/donors`,
          providesTags: ["Donors"]
        }),
        getTransactions : build.query({
          query: ({page, pageSize , sort, search}) => ({
            url: `client/transactions`,
            method:'GET',
            params: {page , pageSize , sort , search}
          }),
          providesTags: ["Transactions"]
        }),
        getGeography: build.query({
          query : () =>`client/geography`,
          providesTags: ['Geography']
        }),
        getFundStat: build.query({
          query: () => `funds/overAllStat`,
          providesTags:["OverAllStat"]
        }),
        getAdmins : build.query({
          query: () => `management/admins`,
          providesTags: ['Admin']
        }),
        getPerformanceStat: build.query({
          query : (id) => `management/performance/${id}`,
          providesTags: ["Performance"]
        }),
        getDashboardStats: build.query({
          query: () => 'general/dashboardStats',
          providesTags: ["Dashboard"]
        })
    })

})

export const {
    useGetUserQuery,
    useGetCampaignsQuery,
    useGetDonorsQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetFundStatQuery,
    useGetAdminsQuery,
    useGetPerformanceStatQuery,
    useGetDashboardStatsQuery
} = api