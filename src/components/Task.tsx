import styles from './Task.module.css'
import { ChangeEvent, useEffect, useState } from 'react'

interface TaskProps {
    id: number,
    content: string,
    completed: boolean,
    onDelete: (task: number) => void,
    updateTaskCompleted: (id: number, completed: boolean) => void,
}

export function Task({ id, content, completed, onDelete, updateTaskCompleted } : TaskProps) {

    const [completedTask, setCompletedTask] = useState(completed)
    
    useEffect(() => {
        handleInputChecked()
    }, [completedTask])

    function handleInputChecked() {
        if (completedTask) {
            updateTaskCompleted(id, completedTask)
        }else{
            updateTaskCompleted(id, completedTask)
        }
    }

    function handleDeleteTask(id: number) {
        onDelete(id)
    }

    
    return (
        <article className={styles.task}>
            <label  className={completedTask ? styles.inputChecked : styles.inputNoChecked}>
                {content}
                <input type="checkbox" defaultChecked={completedTask} onClick={() => { setCompletedTask(!completedTask) }}/>
                <span></span>
            </label>
            <div onClick={(event: React.MouseEvent<HTMLElement>) => {handleDeleteTask(id)}}>
                <i className={styles.icon}></i>
            </div>
        </article>
    )
}