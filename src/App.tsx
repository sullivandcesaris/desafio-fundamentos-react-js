import plus from './assets/plus.svg'
import clipboard from './assets/clipboard.svg'
import './global.css'
import styles from './App.module.css'

import { Header } from './components/Header'
import { Task } from './components/Task'
import { FormEvent, SetStateAction, useEffect, useState } from 'react'

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
  let emptyTasks = true
  if (oldTasks.length > 0) {
    emptyTasks = false;
  }

  const [tasks, setTasks] = useState(oldTasks);

  const [inputNewTaskText, setInputNewTaskText] = useState('');

  const [tasksCompleted, setTasksCompleted] = useState(
    tasks.filter(function(task) {
      return task.completed == true;
    })
  );

  function handleTextNewTask(event: { target: { value: SetStateAction<string> } }) {

    setInputNewTaskText(event.target.value);
  }

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault()

    const lastItem = tasks[tasks.length - 1]
    const task = {
      id: lastItem.id + 1,
      content: inputNewTaskText,
      completed: false,
    }

    setTasks([...tasks, task]);

    setInputNewTaskText('');
  }

  function updateTaskCompleted(id: number, completed: boolean) {

    const tasksModified = tasks.map(function(task) {
      if (task.id == id) {
        return {
          id: task.id,
          content: task.content,
          completed: completed
        };
      } else {
        return {
          id: task.id,
          content: task.content,
          completed: task.completed,
        };
      }
    })

    setTasks(tasksModified)
  }

  useEffect(() => {
    taskCompletedCount()
  }, [tasks])

  function taskCompletedCount() {
    const tasksCompletedCount = tasks.filter(function(task) {
      return task.completed == true;
    })


    setTasksCompleted(tasksCompletedCount)
  }

  function onDelete(taskToDelete: number) {
      const taskWithoutDeletedOne = tasks.filter(task => {
        return task.id !== taskToDelete
      })

      setTasks(taskWithoutDeletedOne);
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
            <div className={styles.inputStyle}>
              <input
                name="inputTask"
                type="text"
                placeholder="Adicione uma nova tarefa"
                onChange={handleTextNewTask}
                value={inputNewTaskText}
                required
              />
            </div>
            <button type="submit">
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
                Concluídas <span>{tasksCompleted.length} de {tasks.length}</span>
              </div>

            </header>

            <article>
              {! emptyTasks &&
                tasks.map(task => {
                  return (
                    <Task
                      key={task.id}
                      id={task.id}
                      content={task.content}
                      completed={task.completed}
                      onDelete={onDelete}
                      updateTaskCompleted={updateTaskCompleted}
                    />
                  )
                })
              }
              {emptyTasks && 
                <div className={styles.noTasks}>
                  <div>
                    <img src={clipboard} />
                  </div>
                  <p>
                    Você ainda não tem tarefas cadastradas <br />
                    <span>Crie tarefas e organize seus itens a fazer</span>
                  </p>
                </div>
              }
            </article>
          </div>
        </div>
      </div>
    </div>

  )
}
