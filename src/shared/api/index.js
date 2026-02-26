import {
    userApi, leadsApi, schoolsApi,
    statusApi, groupApi, sourceApi,
    studentApi, clientApi, scheduleApi,
    lessonsApi, stylesApi, profileApi, studentClientsApi
} from '../../entities';


export const APIs = {
    user: userApi,
    profile: profileApi,
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
    lesson: lessonsApi,
    style: stylesApi,
    //school
    schools: schoolsApi,

    // relations

    student_clients: studentClientsApi,

};


export { api } from './base';