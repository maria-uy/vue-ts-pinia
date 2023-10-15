import { computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useQuery } from "@tanstack/vue-query";
import clientsApi from "@/api/clients-api";
import type { Client } from "../interfaces/client";
import { useClientsStore } from "@/stores/clients";


    const getClients = async( page: number ):Promise<Client[]> => {
        const { data } = await clientsApi.get<Client[]>(`/clients?_page=${ page }`)
        return data
    }
    
    const useClients = () => {

        const store = useClientsStore();
        const { currentPage, clients, totalPages } = storeToRefs( store )

        const { isLoading, data } = useQuery(
            ['clients?page=', currentPage],
            () => getClients( currentPage.value )
        )

        watch( data, clients => {
            if( clients )
            store.setClients( clients )
        })

        return {
            isLoading,
            clients,
            currentPage,
            totalPages,

            // Actions
            getPage( page: number ) {
                store.setPage ( page )
            },

            // Getters
            // totalPageNumbers: computed(
            //     () => [...new Array(totalPages.value)].map((value, index) => index + 1)
            // ),
        }
    }

    export default useClients;