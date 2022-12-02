import TaskComp from "../Cards/TaskComp";
import { useTimeTrackContext } from "../context/TimeTrackerContext";

type TaskCompProps = {
  id: string;
  projectId: string;
  projectTitle: string;
  title: string;
  time_spent: number;
  invoiced: string;
  removeButton?: boolean | undefined;
};

const Timer = () => {
  const { tasks } = useTimeTrackContext();

  return (
    <>
      {tasks.map((task: TaskCompProps) => (
        <TaskComp key={task.id} {...task} ></TaskComp>
      ))}
    </>
  );
};

export default Timer;
