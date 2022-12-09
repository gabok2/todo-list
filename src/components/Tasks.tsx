
import styles from './Tasks.module.css';
import clipBoard from '../assets/clipboard.svg';
import { Lista } from './Lista';
import { PlusCircle } from 'phosphor-react';
import { FormEvent, useState, ChangeEvent } from 'react';


interface NewTask {
  title: string;
  completed: boolean;
  id: number;

}

export function Tasks() {
  const [tasks, setTasks] = useState<NewTask[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [tasksCount, setTasksCount] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);


  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle === '') {
      return;
    }
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  }

  console.log(tasks);

  function handleNewTaskTitle(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value);
  }

  function handleTasksCount() {
    if (newTaskTitle === '') {
      return;
    }

    setTasksCount(tasksCount + 1);
  }

  const isNewCommentEmpty = newTaskTitle.trim() === '';


  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `completed` de uma task com dado ID e altere o icone de check
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      completed: !task.completed,
    } : task);
    setTasks(newTasks);

    const completedTasks = newTasks.filter(task => task.completed === true);
    setTasksCompleted(completedTasks.length);

  }


  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    setTasksCount(tasksCount - 1);

    const completedTasks = newTasks.filter(task => task.completed === true);
    setTasksCompleted(completedTasks.length);

  }

  return (
    <>
      <article className={styles.inputContent}>
        <form onSubmit={handleCreateTask} className={styles.inputForm}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTaskTitle}
            onChange={handleNewTaskTitle}
          />
          <button
            disabled={isNewCommentEmpty}
            type="submit"
            onClick={handleTasksCount}
          >
            Criar
            <PlusCircle size={16} />
          </button>
        </form>

      </article>
      <div className={styles.container}>
        <div className={styles.rowInfo}>
          <div className={styles.createdInfo}>
            <strong>Tarefas criadas</strong>
            <span>{tasksCount}</span>
          </div>
          <div className={styles.doneInfo}>
            <strong>Concluidas</strong>
            <span>{tasksCompleted} de {tasksCount}</span>
          </div>
        </div>
        {tasks.length > 0 ? (
          <div>
            {tasks.map((task) => (
              <Lista
                key={task.id}
                title={task.title}
                completed={handleToggleTaskCompletion}
                tasks={task.id}
                remove={handleRemoveTask}
                isCompleted={task.completed}


              />
            ))}
          </div>
        ) : (
          <footer className={styles.empty}>
            <img src={clipBoard} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </footer>
        )}

      </div>
    </>
  );
}