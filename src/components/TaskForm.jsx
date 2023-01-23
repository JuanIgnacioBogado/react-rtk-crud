import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatchTasks } from '../features/tasks/useDispatchTasks';

export const TaskForm = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { tasks } = useSelector(({ tasks }) => tasks);
  const { id } = useParams();
  const { addTask, updateTask } = useDispatchTasks();

  const handleSubmit = e => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    if ([title, description].some(text => !text.trim())) return;

    const newTask = {
      id: crypto.randomUUID(),
      done: false,
      title,
      description
    };

    if (id) {
      updateTask({ id, title, description });
    } else {
      addTask(newTask);
    }
    navigate('/');
  };

  useEffect(() => {
    if (!id) return;
    const task = tasks.find(task => task.id === id);
    if (!task) return navigate('/');

    formRef.current.title.value = task.title;
    formRef.current.description.value = task.description;
  }, []);

  return (
    <div className="w-4/6">
      <h1 className="text-center text-6xl mb-20">
        {id ? 'Edit Task' : 'Create Task'}
      </h1>
      <form
        className="bg-zinc-800 max-w-sm p-6 rounded-md flex gap-5 flex-col mx-auto"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div>
          <label className="block text-xs font-bold mb-2" htmlFor="title">
            Title:
          </label>
          <input
            className="w-full p-2 rounded-md bg-zinc-600 focus:outline-indigo-600 focus:border-none"
            type="text"
            placeholder="Title"
            name="title"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            className="w-full p-2 rounded-md bg-zinc-600 outline-indigo-600 focus:border-none"
            name="description"
            placeholder="Description"
          ></textarea>
        </div>

        <button
          className="hover:bg-indigo-700 bg-indigo-600 py-1 px-2 rounded-md"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};
