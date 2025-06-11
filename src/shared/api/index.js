import { userApi, leadsApi, schoolsApi, statusApi, groupApi, sourceApi, studentApi, clientApi, scheduleApi } from '../../entities';


export const APIs = {
    user: userApi,
    //lead
    lead: leadsApi,
    source: sourceApi,
    status: statusApi,
    //student
    student: studentApi,
    //client
    client: clientApi,

    group: groupApi,
    schedule: scheduleApi,
    //school
    schools: schoolsApi,

};


export { api } from './base';