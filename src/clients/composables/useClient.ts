
import { computed, ref, watch } from 'vue';
import { useQuery, useMutation } from '@tanstack/vue-query';

import clientsApi from '@/api/clients-api';
import type { Client } from '@/clients/interfaces/client'


const getClient = async (id:number):Promise<Client> => {
    const { data } = await clientsApi.get(`/clients/${id}`);
    return data
}

const updateClient = async( client: Client ):Promise<Client> => {
    // await new Promise (resolve => {
    //     setTimeout( () => resolve(true), 2000)
    // })
    const { data } = await clientsApi.patch<Client>(`/clients/${client.id}`, client)
    return data
}


const useClient = ( id: number ) => {
    
    const client = ref<Client>();

    const { isLoading, data, isError } = useQuery(
        ['client', id],
        () => getClient(id),
        { retry: false }
    );

    const clientMutation = useMutation(updateClient, {
        // onSuccess(data, variables, context) {
        //     console.log(data)
        // },
    })

    watch( data, () => {
        if (data.value)
            client.value = {...data.value}; // desestructuro para hacer un nuevo objeto y romper la referencia a data que es readonly
    }, { immediate: true })


    return {
        client,
        isLoading,
        clientMutation,
        isError,

        // Method
        updateClient: clientMutation.mutate,
        isUpdating: computed(() => clientMutation.isLoading.value),
        isUpdatingSuccess: computed(() => clientMutation.isSuccess.value),
        isErrorUpdating: computed(() => clientMutation.isError.value)
    }
}

export default useClient    