import { useEffect, useState } from "react";
import { calculateTime } from "../timer/CalcTime";
import { Controls } from "../timer/Controls";
import TimeCard from "./controls";
import { useTimeTrackContext } from "../context/TimeTrackerContext";
import {Box, Text} from "@chakra-ui/react";

type Task = {
  id: string;
  projectId: string;
  projectTitle: string;
  title: string;
  time_spent: number;
  invoiced: string;
  removeButton?: boolean | undefined;
  allTimes?: boolean | undefined;
};

const TaskComp = (task: Task) => {
  const { times } = useTimeTrackContext();
  const [activeTimes, setActiveTimes] = useState([]);
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timerArray, setTimerArray] = useState<Array<number | string>>([]);
  const currentTask = task;

  useEffect(() => {
    let timeArray: Array<number | string> = calculateTime(timeInSeconds);
    setTimerArray(timeArray);
  }, [timeInSeconds]);

  useEffect(() => {
    if (task.allTimes == true) {
      setActiveTimes(times.filter((time: any) => time.taskId == task.id));
    } else
      setActiveTimes(
        times.filter(
          (time: any) => time.taskId == task.id && time.active == true
        )
      );
  }, [times]);

  return (
    <>
      <Box marginTop={10} display={"flex"}  justifyContent={"center"} alignContent={"center"} flexDirection={"column"} border={"2px"}>
        <Box
       
          h={"20px"}
          background={"gray.300"}
          
        
        ></Box>
        <Box >
        <Text display={"flex"}  justifyContent={"center"}>Task:{task.title}</Text>
      
        <Text display={"flex"}  justifyContent={"center"}>Project:{task.projectTitle}</Text>
      
        <Controls
          {...currentTask}
          setTimeInSeconds={setTimeInSeconds}
          removeButton={task.removeButton}
        />
        <Box  display={"flex"} flexDirection={"row"}>
          {activeTimes.map((time: any) => (
            <TimeCard key={time.id} time={time} {...currentTask} />
          ))}
        </Box>
        
        </Box>
      </Box>
    </>
  );
};

export default TaskComp;
