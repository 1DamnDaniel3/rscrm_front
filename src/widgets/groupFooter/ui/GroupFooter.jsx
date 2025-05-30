import { useDispatch, useSelector } from "react-redux"
import { Footer } from "../../../shared"
import { fetchGroups, selectGroups, selectUser } from "../../../entities"
import { useEffect } from "react"

export const GroupFooter = () => {
    const dispatch = useDispatch();
    const groups = useSelector(selectGroups)
    const user = useSelector(selectUser)




    useEffect(() => {

        const schoolId = user.school_id === "null" ? null : user.school_id;
        if (schoolId) {
            dispatch(fetchGroups(schoolId))
        }
    }, [dispatch, user.school_id])

    return (
        <div>

            <Footer />

        </div>
    )
}