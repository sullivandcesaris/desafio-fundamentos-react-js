import styles from './Task.module.css'
import { ChangeEvent, useState } from 'react'

interface TaskProps {
    id: number,
    content: string,
    completed: boolean,
}

export function Task({ id, content, completed } : TaskProps) {

    const [completedTask, setCompletedTask] = useState(completed)
    
    const [inputChecked, setInputChecked] = useState(
            completedTask 
            ? <input type="checkbox" checked/> 
            : <input type="checkbox" />
        )

    function handleInputChecked(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            setInputChecked(<input type="checkbox" name="inputChecked" checked/>)
            setCompletedTask(true)
        }else{
            setInputChecked(<input type="checkbox" />)
            setCompletedTask(false)
        }
    }


    return (
        <article className={styles.task}>
            <label  className={completedTask ? styles.inputChecked : styles.inputNoChecked}>
                {content}
                {inputChecked}
                <span></span>
            </label>
            <div>
                <i className={styles.icon}></i>
            </div>
        </article>
    )
}