export { clientApi } from './api/clientApi'
export {
    default as clientReducer, addClient, updateClient, deleteClient, fetchClients,
    selectClients, selectClientsError, selectClientsLoading,
} from './model/clientSlice'