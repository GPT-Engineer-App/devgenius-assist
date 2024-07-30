import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="mr-2"
        />
        <Button onClick={addTask}>Add</Button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center mb-2">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="mr-2"
            />
            <label
              htmlFor={`task-${task.id}`}
              className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
              {task.text}
            </label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTask(task.id)}
              className="ml-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
