import { userApi, leadsApi, schoolsApi, statusApi, groupApi, sourceApi } from '../../entities';


export const APIs = {
    user: userApi,
    lead: leadsApi,
    schools: schoolsApi,
    status: statusApi,
    source: sourceApi,
    group: groupApi,

};


export { api } from './base';