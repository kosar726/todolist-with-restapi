
import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";

function TodoList({ token, updateToken }) {
  const [cachedTasks, setCachedTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("priority");
  const [sortDirection, setSortDirection] = useState("desc");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (cachedTasks.length > 0) {
      const sortedTasks = sortTasks(cachedTasks, sort, sortDirection);
      const paginatedTasks = sortedTasks.slice((page - 1) * 2, page * 2);
      setTasks(paginatedTasks);
    } else {
      fetchTasks();
    }
  }, [page, sort, sortDirection, cachedTasks]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Could not fetch tasks");
      }
      const data = await res.json();
      setCachedTasks(data.tasks);
      const sortedTasks = sortTasks(data.tasks, sort, sortDirection);
      setTasks(sortedTasks.slice((page - 1) * 2, page * 2));
      setTotalItems(data.totalItems);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sortTasks = (tasksToSort, sortType, direction) => {
    const sorted = [...tasksToSort];
    if (sortType === "priority") {
      sorted.sort((a, b) =>
        direction === "desc" ? b.priority - a.priority : a.priority - b.priority
      );
    } else if (sortType === "createdAt") {
      sorted.sort((a, b) =>
        direction === "desc"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (sortType === "completed") {
      sorted.sort((a, b) =>
        direction === "desc"
          ? a.completed === b.completed
            ? 0
            : a.completed
            ? 1
            : -1
          : a.completed === b.completed
          ? 0
          : a.completed
          ? -1
          : 1
      );
    }
    return sorted;
  };
  const toggleComplete = async (id) => {
    try {
        const res = await fetch(`http://localhost:8080/taskComplete/${id}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Could not change the status');
        fetchTasks();
    } catch (err) {
        setError(err.message);
    }
};

const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
        try {
            const res = await fetch(`http://localhost:8080/task/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error('Could not delete task');
            fetchTasks();
        } catch (err) {
            setError(err.message);
        }
    }
};

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <nav className="flex justify-end mb-4">
        <button
          onClick={() => updateToken(null)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition shadow-md"
        >
          Logout
        </button>
      </nav>
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
        Task List
      </h1>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            setEditTask(null);
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition shadow-md"
        >
          + Add Task
        </button>
        <div className="flex items-center space-x-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="priority">sort by priority</option>
            <option value="createdAt">sort by date</option>
            <option value="completed">sort by status</option>
          </select>
          <button
            onClick={() => setSortDirection(sortDirection === "desc" ? "asc" : "desc")}
            className="bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300 transition shadow-md"
          >
            {sortDirection === "desc" ? "⬇ Descending" : "⬆ Ascending"}
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks!</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`p-4 border rounded-md shadow-lg ${
                task.completed ? "bg-green-100 line-through text-gray-500" : "bg-white"
              } transition`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <strong className="text-lg text-gray-900">{task.title}</strong>
                  <span className="text-sm text-gray-500 ml-2">
                    (priority: {task.priority})
                  </span>
                  <p className="text-gray-700">subject: {task.subject}</p>
                  <p className="text-gray-500 text-sm">
                     created At : {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => toggleComplete(task._id)}
                    className={`px-3 py-2 rounded-md ${
                      task.completed
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white transition shadow-md`}
                  >
                    {task.completed ? "undo" : "complete"}
                  </button>
                  <button
                    onClick={() => {
                      setEditTask(task);
                      setShowModal(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition shadow-md"
                  >
                    edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition shadow-md"
                  >
                    delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center items-center space-x-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-200 px-4 py-2 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
        >
          previous
        </button>
        <span className="text-lg font-medium">{page}</span>
        <button
          disabled={page * 2 >= totalItems}
          onClick={() => setPage(page + 1)}
          className="bg-gray-200 px-4 py-2 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
        >
          next
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {showModal && <TaskForm token={token} task={editTask} onClose={() => setShowModal(false)} onSave={fetchTasks} />}
    </div>
  );
}

export default TodoList;
