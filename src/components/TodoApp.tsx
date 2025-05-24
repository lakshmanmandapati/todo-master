
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useTodos } from '@/hooks/useTodos';
import { CheckCircle2, ListTodo, Target } from 'lucide-react';

const TodoApp = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const pendingCount = totalCount - completedCount;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <ListTodo className="text-yellow-300" size={48} />
          Todo Master
        </h1>
        <p className="text-blue-100 text-lg">Organize your tasks and boost your productivity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="text-blue-300" size={24} />
              <div>
                <p className="text-sm text-blue-100">Total Tasks</p>
                <p className="text-2xl font-bold">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-300" size={24} />
              <div>
                <p className="text-sm text-green-100">Completed</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ListTodo className="text-orange-300" size={24} />
              <div>
                <p className="text-sm text-orange-100">Pending</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Todo Card */}
      <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">My Tasks</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <TodoForm onAddTodo={addTodo} />
          <TodoList 
            todos={todos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoApp;
