
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Check, Edit, Trash2, Save, X } from 'lucide-react';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <Card className={`p-4 transition-all duration-200 hover:shadow-md ${
      todo.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center gap-3">
        <Button
          onClick={() => onToggle(todo.id)}
          variant="outline"
          size="sm"
          className={`w-8 h-8 rounded-full transition-all duration-200 ${
            todo.completed 
              ? 'bg-green-500 border-green-500 text-white hover:bg-green-600' 
              : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
          }`}
        >
          {todo.completed && <Check size={16} />}
        </Button>

        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEdit();
                if (e.key === 'Escape') handleCancel();
              }}
              className="flex-1"
              autoFocus
            />
            <Button onClick={handleEdit} size="sm" variant="outline" className="text-green-600 hover:bg-green-50">
              <Save size={16} />
            </Button>
            <Button onClick={handleCancel} size="sm" variant="outline" className="text-gray-600 hover:bg-gray-50">
              <X size={16} />
            </Button>
          </div>
        ) : (
          <>
            <span 
              className={`flex-1 text-lg transition-all duration-200 ${
                todo.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800'
              }`}
            >
              {todo.text}
            </span>
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
              className="text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Edit size={16} />
            </Button>
            <Button
              onClick={() => onDelete(todo.id)}
              variant="outline"
              size="sm"
              className="text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={16} />
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default TodoItem;
