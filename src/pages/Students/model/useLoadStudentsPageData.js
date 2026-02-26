import { useDispatch, useSelector } from "react-redux"
import { fetchClients, fetchGroups, groupedStudents, selectSelectedGroupId, selectUser, studentClients } from "../../../entities";
import { useEffect } from "react";

export const useLoadStudentsPageData = ({entity_type}) => {
    const dispatch = useDispatch();
    const group_id = useSelector(selectSelectedGroupId)
    const user = useSelector(selectUser);

    const newStudentData = {
        "group": {
            "group_id": group_id,
        },
        "student": {
            "name": "New",
            "skill_level": "beginner"
        }

    }

    useEffect(() => {
        if(user?.school_id){
            dispatch(fetchGroups({ school_id: user.school_id, entity_type }))
        }   
    }, [dispatch, user.school_id, entity_type]);

    useEffect(() => {
            if(!user?.school_id) return;
            if(!group_id) return;

            dispatch(groupedStudents({group_id: group_id}))
    
        }, [dispatch, user.school_id, entity_type, group_id]);

    return { newStudentData }

}