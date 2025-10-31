import s from './Landing.module.css'
import { HeroBlock, ButtonLink, Loader} from '../../../shared'
import { useNavigate } from 'react-router-dom'


export const Landing = () => {
    const navigate = useNavigate();
    return(
        <div>
            <HeroBlock heroTitle={"Сдесь будет лендинг, точно!"}/>
            <ButtonLink text={"К регистрации! "} onClick={()=>{navigate("/registration")}}/>
        </div>
    )
}