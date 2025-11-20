import { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [taskText, setTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskText.trim()) return;
    setTasks([...tasks, { text: taskText, completed: false }]);
    setTaskText("");
  };

  const toggleComplete = (i) => {
    const u=[...tasks]; u[i].completed=!u[i].completed; setTasks(u);
  };

  const editTask = (i) => {
    const t=prompt("Edit task:",tasks[i].text);
    if(t){const u=[...tasks];u[i].text=t;setTasks(u);}
  };

  const deleteTask = (i) => {
    const u=[...tasks];u.splice(i,1);setTasks(u);
  };

  const filtered = tasks.filter(t =>
    filter==="completed" ? t.completed :
    filter==="pending" ? !t.completed : true
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-xl p-6 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">
          Dnyx To-Do List
        </h1>

        <div className="flex gap-3 mb-4">
          <input
            className="flex-1 border px-3 py-2 rounded"
            placeholder="Enter task..."
            value={taskText}
            onChange={(e)=>setTaskText(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={addTask}>Add</button>
        </div>

        <div className="flex justify-center gap-3 mb-5">
          {["all","pending","completed"].map(f=>(
            <button key={f}
              onClick={()=>setFilter(f)}
              className={`px-3 py-1 rounded ${
                filter===f?"bg-blue-600 text-white":"bg-gray-300"
              }`}>
              {f[0].toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>

        <ul className="space-y-3">
          {filtered.map((task,i)=>(
            <li key={i}
              className="flex justify-between bg-gray-100 p-3 rounded shadow-sm">
              <span className={`flex-1 ${task.completed?"line-through text-gray-500":""}`}>
                {task.text}
              </span>
              <div className="flex gap-2">
                <button onClick={()=>toggleComplete(i)}
                  className="bg-blue-500 text-white px-2 py-1 rounded">✔</button>
                <button onClick={()=>editTask(i)}
                  className="bg-green-500 text-white px-2 py-1 rounded">✎</button>
                <button onClick={()=>deleteTask(i)}
                  className="bg-red-500 text-white px-2 py-1 rounded">🗑</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
