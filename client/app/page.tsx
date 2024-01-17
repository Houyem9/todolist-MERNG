'use client'

import TodoListComponent from "@/components/TodoList";
import React from "react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {console.log('scope is: ', registration.scope)
      }) .catch((error) => {
          console.log("Service worker registration failed");
        });
    }
  }, []);
  return (
    <main>
      <TodoListComponent/>
    </main>
  );
}