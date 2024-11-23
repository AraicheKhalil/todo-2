'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, Search, Edit, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: number
  updatedAt: number
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setTasks([...tasks, newTask])
    setIsAddModalOpen(false)
    setNewTaskTitle('')
    setNewTaskDescription('')
  }

  const editTask = () => {
    if (currentTask) {
      setTasks(tasks.map(task =>
        task.id === currentTask.id
          ? { ...task, title: newTaskTitle, description: newTaskDescription, updatedAt: Date.now() }
          : task
      ))
      setIsEditModalOpen(false)
      setCurrentTask(null)
      setNewTaskTitle('')
      setNewTaskDescription('')
    }
  }

  const deleteTask = () => {
    if (currentTask) {
      setTasks(tasks.filter(task => task.id !== currentTask.id))
      setIsDeleteModalOpen(false)
      setCurrentTask(null)
    }
  }

  const toggleComplete = (task: Task) => {
    setTasks(tasks.map(t =>
      t.id === task.id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t
    ))
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 lg:p-16 pt-6">
      <h1 className="text-3xl font-bold mb-8 text-center">To-Do List</h1>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div key={task.id} className="flex flex-col gap-6 items-start md:flex-row md:items-center md:justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleComplete(task)}
              />
              <div>
                <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                )}
                <p className="mt-2 text-xs text-gray-400">
                  {task.updatedAt > task.createdAt ? 'Updated' : 'Created'}: {new Date(task.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-2 ">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setCurrentTask(task)
                  setNewTaskTitle(task.title)
                  setNewTaskDescription(task.description || '')
                  setIsEditModalOpen(true)
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setCurrentTask(task)
                  setIsDeleteModalOpen(true)
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium">
                Description (optional)
              </label>
              <Textarea
                id="description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addTask}>
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="edit-title" className="block text-sm font-medium">
                Title
              </label>
              <Input
                id="edit-title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="edit-description" className="block text-sm font-medium">
                Description (optional)
              </label>
              <Textarea
                id="edit-description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={editTask}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this task? This action cannot be undone.</p>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={deleteTask} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


