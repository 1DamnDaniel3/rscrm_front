import { GroupFooter, Navigation, StudentsTable } from '../../../widgets'
import { Button, HeroBlock } from '../../../shared'
import { useLoadStudentsPageData } from '../model/useLoadStudentsPageData'
import { addStudent } from '../../../entities'
import { useDispatch } from 'react-redux'

import s from './StudentsPage.module.css'


export const StudentsPage = () => {
    const dispatch = useDispatch();
    const {newStudentData} = useLoadStudentsPageData({entity_type: "student"});
    
    return(
        <div className={s.pageContainer}>
            <Navigation/>
            <Button className={s.addButton} onClick={()=> dispatch(addStudent(newStudentData))}/>
            <HeroBlock heroTitle={"STUDENTS"}/>
            <StudentsTable/>
            <GroupFooter entity_type={"student"}/>
        </div>
    )
}