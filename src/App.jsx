import { HashRouter, Routes, Route } from 'react-router-dom';

import { TaskForm, TaskList } from './components';

function App() {
  return (
    <div className="grid place-items-center h-full">
      <HashRouter>
        <Routes>
          <Route path="/*" element={<TaskList />} />
          <Route path="create-task" element={<TaskForm />} />
          <Route path="edit-task/:id" element={<TaskForm />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
