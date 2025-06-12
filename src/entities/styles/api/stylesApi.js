import { api } from "../../../shared";

export const stylesApi = {
    addStyle: async (data) => api.post('/styles/registration', data),
    // getAllStyles: async () => api.get('/styles'),
    getAllStylesWhere: async (query) => api.post('/styles/getAllWhere', query),
    getStyleById: async (id) => api.get(`/styles/${id}`),
    updateStyle: async (id, data) => api.put(`/styles/${id}`, data),
    deleteStyle: async (id) => api.delete(`/styles/${id}`),

}