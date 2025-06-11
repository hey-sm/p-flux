"use client";

import React, { useState } from "react";
import { useList } from "react-use";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  PlusIcon,
  Trash2Icon,
  Edit2Icon,
  CheckIcon,
  XIcon,
  ShoppingCartIcon,
  PackageIcon,
} from "lucide-react";
import { CODE_EXAMPLES } from "./NativeImplementation";

// =====================================
// 场景演示组件
// =====================================

// 基本列表操作组件
function BasicList() {
  const [list, { set, push, removeAt, insertAt, updateAt, clear }] =
    useList<string>(["React", "Vue", "Angular"]);
  const [newItem, setNewItem] = useState("");

  const handlePush = () => {
    if (newItem.trim()) {
      push(newItem);
      setNewItem("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="添加新框架..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handlePush()}
        />
        <Button onClick={handlePush} size="sm">
          <PlusIcon className="h-4 w-4 mr-1" />
          添加
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => clear()}>
          清空列表
        </Button>
        <Button variant="outline" size="sm" onClick={() => push("Svelte")}>
          添加Svelte
        </Button>
        {list.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => removeAt(0)}>
            移除第一项
          </Button>
        )}
        {list.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateAt(0, "React.js")}
          >
            更新第一项
          </Button>
        )}
      </div>

      <div className="border rounded-md overflow-hidden">
        {list.length > 0 ? (
          <ul className="divide-y">
            {list.map((item, index) => (
              <li key={index} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{index + 1}</Badge>
                  <span>{item}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAt(index)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            列表为空，请添加项目
          </div>
        )}
      </div>

      <div className="bg-muted p-3 rounded-md">
        <p className="text-xs font-medium">列表项数：{list.length}</p>
      </div>
    </div>
  );
}

// Todo列表组件
function TodoList() {
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

  const [todos, { set, push, removeAt, updateAt }] = useList<Todo>([
    { id: 1, text: "学习 React Hooks", completed: true },
    { id: 2, text: "完成项目文档", completed: false },
    { id: 3, text: "准备周会演示", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      push({
        id: Date.now(),
        text: newTodo,
        completed: false,
      });
      setNewTodo("");
    }
  };

  const toggleComplete = (index: number) => {
    const todo = todos[index];
    updateAt(index, { ...todo, completed: !todo.completed });
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditText(todos[index].text);
  };

  const saveEdit = () => {
    if (editingIndex !== null && editText.trim()) {
      const todo = todos[editingIndex];
      updateAt(editingIndex, { ...todo, text: editText });
      setEditingIndex(null);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">待办事项列表</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="添加新待办事项..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          />
          <Button onClick={handleAddTodo}>添加</Button>
        </div>

        <div className="space-y-1">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <div
                key={todo.id}
                className="flex items-center gap-2 p-2 border rounded-md group hover:bg-slate-50"
              >
                {editingIndex === index ? (
                  <>
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                      autoFocus
                    />
                    <Button variant="ghost" size="icon" onClick={saveEdit}>
                      <CheckIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={cancelEdit}>
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleComplete(index)}
                      id={`todo-${todo.id}`}
                    />
                    <Label
                      htmlFor={`todo-${todo.id}`}
                      className={`flex-grow ${
                        todo.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {todo.text}
                    </Label>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing(index)}
                      >
                        <Edit2Icon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAt(index)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-gray-500">
              没有待办事项，开始添加吧！
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 text-sm">
        已完成 {completedCount}/{todos.length} 项
      </CardFooter>
    </Card>
  );
}

// 购物车组件
function ShoppingCart() {
  interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }

  const [cart, { push, removeAt, updateAt, clear }] = useList<Product>([
    { id: 1, name: "无线耳机", price: 199, quantity: 1 },
    { id: 2, name: "机械键盘", price: 299, quantity: 1 },
  ]);

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      const item = cart[index];
      updateAt(index, { ...item, quantity: newQuantity });
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingCartIcon className="h-5 w-5" />
            购物车
          </CardTitle>
          <Badge variant="outline">{cart.length} 件商品</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {cart.length > 0 ? (
          <>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between pb-4 border-b last:border-0"
                >
                  <div className="flex-grow">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      ¥{item.price.toFixed(2)} / 件
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <span className="text-lg">−</span>
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        disabled={item.quantity >= 10}
                      >
                        <span className="text-lg">+</span>
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAt(index)}
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" size="sm" onClick={() => clear()}>
                清空购物车
              </Button>
              <div className="text-xl font-bold">¥{totalPrice.toFixed(2)}</div>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <PackageIcon className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">购物车为空</p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() =>
                push({
                  id: Date.now(),
                  name: "商品示例",
                  price: 99,
                  quantity: 1,
                })
              }
            >
              添加示例商品
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// 各种使用场景示例代码
const SCENARIO_CODE = {
  BasicListCode: `import { useList } from 'react-use';

function BasicListExample() {
  const [list, { push, removeAt, clear }] = useList(['React', 'Vue', 'Angular']);
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      push(newItem);
      setNewItem('');
    }
  };

  return (
    <div>
      <div>
        <input 
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)} 
          placeholder="添加框架..."
        />
        <button onClick={handleAddItem}>添加</button>
        <button onClick={clear}>清空</button>
      </div>
      
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeAt(index)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
  TodoListCode: `import { useList } from 'react-use';

function TodoListExample() {
  // 定义待办事项类型
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

  // 使用useList管理待办事项列表
  const [todos, { push, removeAt, updateAt }] = useList<Todo>([
    { id: 1, text: '学习React Hooks', completed: false }
  ]);
  
  const [input, setInput] = useState('');

  // 添加新待办事项
  const addTodo = () => {
    if (input.trim()) {
      push({ id: Date.now(), text: input, completed: false });
      setInput('');
    }
  };

  // 切换完成状态
  const toggleComplete = (index: number) => {
    const todo = todos[index];
    updateAt(index, { ...todo, completed: !todo.completed });
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>添加</button>
      
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => removeAt(index)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
  ShoppingCartCode: `import { useList } from 'react-use';

function ShoppingCartExample() {
  interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }

  const [cart, { push, removeAt, updateAt, clear }] = useList<Product>([
    { id: 1, name: '商品A', price: 100, quantity: 1 }
  ]);

  // 更新商品数量
  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity > 0) {
      const item = cart[index];
      updateAt(index, { ...item, quantity: newQuantity });
    }
  };

  // 计算总价
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );

  return (
    <div>
      <h2>购物车 ({cart.length}件商品)</h2>
      
      {cart.map((item, index) => (
        <div key={item.id}>
          <span>{item.name} - ¥{item.price}</span>
          <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
          <button onClick={() => removeAt(index)}>删除</button>
        </div>
      ))}
      
      <div>总价: ¥{totalPrice}</div>
      <button onClick={clear}>清空购物车</button>
    </div>
  );
}
`,
};

export const Examples = [
  {
    title: "基本列表操作",
    example: <BasicList />,
    code: SCENARIO_CODE.BasicListCode,
  },
  {
    title: "待办事项列表",
    example: <TodoList />,
    code: SCENARIO_CODE.TodoListCode,
  },
  {
    title: "购物车",
    example: <ShoppingCart />,
    code: SCENARIO_CODE.ShoppingCartCode,
  },
];
