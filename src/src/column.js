import { useState } from "react";
import { useStore } from "./store";
import Task from "./task";
import { v4 as uuidv4 } from 'uuid';
import classNames from "classnames";

export default function Column({ state }) {
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false);
    const [drop, setDrop] = useState(false);

    const tasks = useStore((store) => store?.tasks?.filter((task) => task?.state === state));
    const addTask = useStore(store => store.addTask);
    const setDraggedTask = useStore(store => store.setDraggedTask);
    const draggedTask = useStore(store => store.draggedTask);
    const moveTask = useStore(store => store.moveTask);

    return (
        <div className={classNames("column", { drop: drop })}
            onDragOver={e => {
                e.preventDefault()
                setDrop(true)
            }}
            onDragLeave={e => {
                e.preventDefault()
                setDrop(false)
            }}
            onDrop={(e => {
                setDrop(false)
                moveTask(draggedTask, state)
                setDraggedTask(null)
            })}>
            <div className="titleWrapper">
                <p>{state}</p>
                <button onClick={() => setOpen(true)}>Add</button>
            </div>
            {tasks?.map((task) => <Task id={task?.id} key={task.id} />)}
            {open && <div className="modal">
                <div className="modalContent">
                    <input onChange={e => setText(e.target.value)} value={text} />
                    <button onClick={() => {
                        addTask(text, state, uuidv4());
                        setText("")
                        setOpen(false)
                    }}>Submit</button>
                </div>
            </div>}
        </div>
    )
}