import classNames from "classnames";
import { useStore } from "./store";

const STATUS = "ONGOING";

export default function Task({ id }) {
    const task = useStore((store) =>
        store?.tasks?.find((task) => task?.id === id)
    )
    const deleteTask = useStore(store => store.deleteTask);
    const setDraggedTask = useStore(store => store.setDraggedTask);

    return (
        <div className="task" draggable onDragStart={() => { setDraggedTask(id) }}>
            <div>{task.title}</div>
            <div className="bottomWrapper">
                <div onClick={() => deleteTask(id)}>Delete</div>
                <div className={classNames('status', task.state)}>{task.state}</div>
            </div>
        </div>
    )
}