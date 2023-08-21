import { produce } from "immer";
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

const store = (set) => ({
    tasks: [{ id: "11111", title: "Test", state: "PLANNED" }],
    draggedTask: null,
    setDraggedTask: (id) => set({ draggedTask: id }, false, "setDraggedTask"),
    addTask: (title, state, id) => set((store) => ({ tasks: [...store?.tasks, { title, state, id }] }), false, "addTask"),
    addTaskUsingimmer: (title, state, id) => set(produce(store => {
        store.tasks.push({ title, state, id })
    }), false, "addTask"),
    deleteTask: (id) => set((store) => ({ tasks: store.tasks?.filter(t => t.id !== id) }), false, "deleteTask"),
    moveTask: (id, state) => set((store) => ({ tasks: store.tasks.map(task => task.id === id ? { ...task, state } : task) }), false, "moveTask")
})

export const useStore = create(persist((devtools(store)), { name: "store" }));