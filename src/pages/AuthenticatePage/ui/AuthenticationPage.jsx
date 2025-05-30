import { Authenticate } from '../../../widgets'
import s from './AuthenticationPage.module.css'

export const AuthenticationPage = () => {
    return(
        <div className={s.authPage}>
            <Authenticate/>
        </div>
    )
}