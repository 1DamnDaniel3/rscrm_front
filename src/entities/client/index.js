export { clientApi } from './api/clientApi'
export {
    default as clientReducer, selectClientsById,
    addClient, updateClient, deleteClient, fetchClients, groupedClients,
    selectClients, selectClientsError, selectClientsLoading, selectClientsByStudent, selectSearchClients,
} from './model/clientSlice'