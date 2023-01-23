import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useDispatchTasks } from '../features/tasks/useDispatchTasks';

export const TaskList = () => {
  const { deleteTask, toggleDoneTask } = useDispatchTasks();
  const { tasks } = useSelector(({ tasks }) => tasks);
  const tasksDone = useMemo(() => tasks.filter(t => t.done).length, [tasks]);

  const onDelete = (e, id) => {
    e.stopPropagation();
    deleteTask(id);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="w-4/6">
      <h1 className="text-center text-6xl mb-20">Task List</h1>
      <header className="flex justify-between items-center py-4">
        <div className="flex gap-x-10">
          <h2>Tasks: {tasks.length}</h2>
          <h2>Done: {tasksDone}</h2>
        </div>
        <Link
          className="hover:bg-indigo-700 bg-indigo-600 px-2 py-1 rounded-sm text-sm"
          to="create-task"
        >
          Create Task
        </Link>
      </header>

      <div className="grid grid-cols-3 gap-5 break-words">
        {tasks?.map(({ id, title, description, done }) => (
          <div
            key={id}
            className={`bg-neutral-800 hover:bg-neutral-700 p-4 rounded-md cursor-pointer ${
              done ? 'bg-neutral-500' : ''
            }`}
            onClick={() => toggleDoneTask(id)}
          >
            <header className="flex justify-between items-start gap-4 mb-4">
              <h3
                className={`overflow-hidden font-bold ${
                  done ? 'line-through italic' : ''
                }`}
              >
                {title}
              </h3>
              <div className="flex gap-2">
                <Link
                  className="bg-zinc-500 hover:bg-zinc-600 py-1 px-2 text-xs rounded-sm"
                  to={`edit-task/${id}`}
                  onClick={e => e.stopPropagation()}
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-600 py-1 px-2 text-xs rounded-sm"
                  onClick={e => onDelete(e, id)}
                >
                  Delete
                </button>
              </div>
            </header>
            <p className={`${done ? 'line-through italic' : ''}`}>
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
