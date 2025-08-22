import React, { useEffect, useState } from "react"

const TaskClient = () => {
  const [taskList, setTaskList] = useState([])
  const [taskName, setTaskName] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      try {
        setTaskList(JSON.parse(storedTasks))
        setIsLoaded(true)
      } catch (error) {
        console.error("Failed to parse tasks from localStorage", error)
      }
    }
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tasks", JSON.stringify(taskList))
    }
  }, [taskList, isLoaded])

  const handleChange = (e) => {
    setTaskName(e.target.value)
  }

  const handleCreate = (e) => {
    e.preventDefault()
    const newTask = {
      id: crypto.randomUUID(),
      name: taskName.trim(),
      isComplete: false,
    }
    setTaskList([...taskList, newTask])
    setTaskName("")
  }

  const toggleComplete = (id) => {
    setTaskList((prevList) =>
      prevList.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTaskList((prevList) => prevList.filter((task) => task.id !== id))
  }

  const updateTask = (id, taskValue) => {
    setTaskList((prevList) =>
      prevList.map((task) =>
        task.id === id ? { ...task, name: taskValue } : task
      )
    )
  }
  return (
    <div className="w-full flex flex-col items-center justify-center mt-8">
      <TaskForm
        handleChange={handleChange}
        taskName={taskName}
        handleCreate={handleCreate}
      />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <div className="min-w-[400px] flex flex-col gap-4 mt-8 border border-gray-200 shadow p-8 rounded-md bg-white">
        {taskList
          .filter((task) => {
            if (filter === "all") return true
            if (filter === "completed") return task.isComplete
            if (filter === "active") return !task.isComplete
          })
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
      </div>
    </div>
  )
}

const TaskForm = ({ handleChange, taskName, handleCreate }) => {
  return (
    <form
      onSubmit={handleCreate}
      className="border p-4 border-gray-300 rounded-md"
    >
      <label htmlFor="task-input" className="sr-only">
        New Task
      </label>
      <input
        type="text"
        id="task-input"
        className="border border-gray-200 rounded ml-2 px-2 py-1 bg-white"
        placeholder="Walk the dog"
        onChange={handleChange}
        value={taskName}
      />
      <button className="ml-4 bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600 hover:cursor-pointer">
        Add Task
      </button>
    </form>
  )
}

const TaskItem = ({ task, toggleComplete, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTaskName, setEditedTaskName] = useState(task.name)

  return (
    <div
      key={task.id}
      className="border border-gray-200 p-4 rounded-md shadow bg-white"
    >
      {isEditing ? (
        <div>
          <div className="flex items-center">
            <input
              type="text"
              value={editedTaskName}
              onChange={(e) => setEditedTaskName(e.target.value)}
              className="w-full border border-gray-200 rounded px-2 py-1"
            />
          </div>
          <div className="h-px bg-gray-200 my-4"></div>
          <div className="flex">
            <button
              type="button"
              onClick={() => {
                updateTask(task.id, editedTaskName)
                setIsEditing(false)
              }}
              className="ml-auto bg-slate-500 text-white cursor-pointer hover:bg-slate-600 px-2 py-1 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="ml-2 px-2 py-1 rounded border border-gray-200 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center">
            <p
              className={`${
                task.isComplete ? `line-through text-gray-600` : ``
              }`}
            >
              {task.name}
            </p>
            <button
              type="button"
              onClick={() => toggleComplete(task.id)}
              className={`ml-auto cursor-pointer rounded-full flex items-center justify-center w-6 h-6 border  ${
                task.isComplete
                  ? `border-none bg-blue-500 hover:bg-blue-600 text-white `
                  : `border-gray-200 hover:bg-gray-100 text-gray-500`
              }`}
            >
              &#10003;
            </button>
          </div>
          <div className="h-px bg-gray-200 my-4"></div>
          <div className="flex text-sm">
            <button
              type="button"
              onClick={() => deleteTask(task.id)}
              className="ml-auto bg-red-500 text-white cursor-pointer hover:bg-red-600 px-2 py-1 rounded"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="ml-2 px-2 py-1 rounded border border-gray-200 hover:bg-gray-100 cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const FilterButtons = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-4 mt-8">
      <button
        type="button"
        onClick={() => setFilter("all")}
        className={`px-2 py-1 cursor-pointer rounded-md  border-2 border-slate-500 hover:bg-gray-100 ${
          filter === "all"
            ? "bg-slate-500 text-white"
            : "bg-white text-slate-500"
        }`}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => setFilter("active")}
        className={`px-2 py-1 cursor-pointer rounded-md  border-2 border-slate-500 hover:bg-gray-100 ${
          filter === "active"
            ? "bg-slate-500 text-white"
            : "bg-white text-slate-500"
        }`}
      >
        Active
      </button>
      <button
        type="button"
        onClick={() => setFilter("completed")}
        className={`px-2 py-1 cursor-pointer rounded-md border-2 border-slate-500 ${
          filter === "completed"
            ? "bg-slate-500 text-white"
            : "bg-white text-slate-500  hover:bg-gray-100"
        }`}
      >
        Completed
      </button>
    </div>
  )
}

export default TaskClient
