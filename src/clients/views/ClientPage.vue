
<script setup lang="ts">

    import { useRoute, useRouter } from 'vue-router';
    import { watch } from 'vue';
    import LoadingModal from '@/shared/components/LoadingModal.vue';
    import useClient from '@/clients/composables/useClient';

    const route = useRoute();
    const router = useRouter();

    const { 
        client, 
        isLoading, 
        isError, 
        clientMutation,
        updateClient,
        isUpdating,
        isUpdatingSuccess,
    } = useClient( +route.params.id );

    watch(clientMutation.isSuccess, () => {
        setTimeout(() => {
            clientMutation.reset();
        }, 2000)
    })

    watch( isError, () => {
        if( isError.value )
            router.replace('/clients')
    });

</script>

<template>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Back to list</RouterLink>
      </nav>
        
        <h3 v-if="isUpdating">Saving...</h3>
        <h3 v-if="isUpdatingSuccess">Saved</h3>

        <LoadingModal v-if="isLoading" />

        <div v-if="client">
            <h3>Client name: <strong>{{ client.name }}</strong></h3>
            <form @submit.prevent="updateClient(client)">
                <input
                    type="text"
                    placeholder="name"
                    v-model="client.name"    
                >
                <input
                    type="text"
                    placeholder="address"
                    v-model="client.address"        
                >
                <button
                    type="submit"
                    :disabled="isUpdating"    
                >Save</button>
            </form>
        </div>

        <code>
            {{ client }}
        </code>
    </div>
</template>


<style scoped>

input {
    display: block;
    margin-bottom: 10px;
    padding: 5px;
}


</style>