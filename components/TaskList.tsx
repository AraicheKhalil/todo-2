import { TaskItem } from './TaskItem'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatePresence } from 'framer-motion'

interface TaskListProps {
  tasks: any
  isLoading: boolean
  onEdit: (task: any) => void
  onDelete: (task: any) => void
  onToggleComplete: (task: any) => void
}

export function TaskList({ tasks, isLoading, onEdit, onDelete, onToggleComplete }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tasks yet. Add one to get started!</p>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <div className="space-y-4">
        {tasks.map((task:any) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </AnimatePresence>
  )
}

