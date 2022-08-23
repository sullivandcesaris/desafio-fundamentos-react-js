import { Header } from './components/Header'

import plus from './assets/plus.svg'
import clipboard from './assets/clipboard.svg'

import styles from './App.module.css'
import './global.css'
import { Task } from './components/Task'
import { useState } from 'react'

const oldTasks = [
  {
    id: 1,
    content: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. Duis vel sed fames integer.',
    completed: false
  },
  {
    id: 2,
    content: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. Duis vel sed fames integer.',
    completed: true
  },
  {
    id: 3,
    content: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer. Duis vel sed fames integer.',
    completed: false
  }
]

export function App() {
  let emptyTasks = false
  if (oldTasks.length === 0) {
    emptyTasks = true;
  }

  const [tasks, setTasks] = useState(oldTasks)

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <form className={styles.taskForm}>
            <div className={styles.inputStyle}>
              <input
                type="text"
                placeholder="Adicione uma nova tarefa"
                required
              />
            </div>
            <button
              type="submit"
            >
              Criar
              <img src={plus} />
            </button>
          </form>

          <div className={styles.list}>
            <header>
              <div className={styles.createdTasks}>
                Tarefas Criadas <span>{tasks.length}</span>
              </div>
              <div className={styles.completedTasks}>
                Concluídas <span>0 de {tasks.length}</span>
              </div>
            </header>
            <article className={emptyTasks ? styles.noTasksCreated : styles.tasksCreated}>

              {tasks.map(task => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    content={task.content}
                    completed={task.completed}
                  />
                )
              })}

              <div className={styles.noTasks}>
                <div>
                  <img src={clipboard} />
                </div>
                <p>
                  Você ainda não tem tarefas cadastradas <br />
                  <span>Crie tarefas e organize seus itens a fazer</span>
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

  )
}
