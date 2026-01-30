import s from './Instruction.module.css'

export const Instruction = ({text}) => {


    return (
        <div className={s.instructionWrapper}>
            <span className={s.instruction}>{text}</span>
        </div>
    )
}