<script setup lang="ts">
    import LoadingModal from '@/shared/components/LoadingModal.vue';
    import useClients from '../composables/useClients';
    import ClientList from '../components/ClientList.vue';
    import PaginationsNumbers from '../components/PaginationsNumbers.vue';

    const { isLoading, clients, currentPage, totalPages, getPage } = useClients();

</script>

<template>
    <div>
        <h2>Client List</h2>
        <!-- Client List -->
        <ClientList :clients="clients" />

        <!-- Pagination -->
        <PaginationsNumbers
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-changed="getPage"
        />

        <!-- Loading -->
        <LoadingModal v-if="isLoading" />
    </div>
</template>


<style scoped>

</style>