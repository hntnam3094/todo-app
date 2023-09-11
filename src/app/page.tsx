import Link from "next/link";
import { prisma } from "../db";
import { TodoItem } from "./component/TodoItem";
import { redirect } from "next/navigation";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({
    where: {
      id: id
    },
    data: {
      complete: complete
    }
  })
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header
        className="flex justify-between
        items-center p-10"
      >
        <h1 className="text-2xl">Toodoos</h1>
        <Link
          href="/new"
          className="border border-slate-300
        text-slate-300 px-2 py-1 rounded hover:bg-slate-700
        focus-within:bg-slate-700
        outline-none"
        >
          New
        </Link>
      </header>

      <ul className="pl-10">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
