"use client";
import { useState } from "react";
import { trpc } from "./_trpc/client";

export default function Home() {
  const [content, setContent] = useState("");
  const getTodos = trpc.getTodos.useQuery();
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
      console.log("done");
    },
  });

  console.log("todos", getTodos.data);

  return (
    <div>
      <div>
        <span>The Todos</span>
        {JSON.stringify(getTodos.data)}
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <input
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-black"
        />
        <button
          onClick={async () => {
            if (content.length) {
              addTodo.mutate(content);
              setContent("");
            }
          }}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
