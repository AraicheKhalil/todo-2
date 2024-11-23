import { Button } from '@/components/ui/button'
import { Edit, Trash, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'



export function TaskItem({ task, onEdit, onDelete, onToggleComplete }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-center justify-between p-4 rounded-lg shadow-lg transition-all duration-300 ${
        task.completed ? 'bg-green-100' : 'bg-white hover:shadow-xl'
      }`}
    >
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggleComplete(task)}
          className={`${task.completed ? 'text-green-500' : 'text-gray-400'} hover:text-green-600`}
        >
          <CheckCircle2 className="h-6 w-6" />
        </Button>
        <div>
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`mt-1 text-sm ${task?.completed ? 'text-gray-400' : 'text-gray-600'}`}>{task.description}</p>
          )}
          <p className="mt-2 text-xs text-gray-400">
            {task.updatedAt > task.createdAt ? 'Updated' : 'Created'}: {new Date(task.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="icon" onClick={() => onEdit(task)} className="text-blue-500 hover:text-blue-600">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onDelete(task)} className="text-red-500 hover:text-red-600">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

