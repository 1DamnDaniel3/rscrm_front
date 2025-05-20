import { LoginForm, RegisterForm } from '../../../../features';
import { ButtonLink } from '../../../../shared';
import { useState } from 'react';
import s from './Authenticate.module.css'

export const Authenticate = () => {
    const [isLoggining, setIsLoggin] = useState(true)

    
    return (
        <div className={s.authContainer}>
            <div className={s.links}>
                <ButtonLink
                    text={"Войти"}
                    onClick={()=> setIsLoggin(true)} 
                    />
                <p> / </p>
                <ButtonLink
                    text={"Зарегистрироваться"} 
                    onClick={()=> setIsLoggin(false)}
                    />
            </div>
            {isLoggining === true && <LoginForm />}
            {isLoggining === false && <RegisterForm setIsLoggin={setIsLoggin}/>}

        </div>
    )
}