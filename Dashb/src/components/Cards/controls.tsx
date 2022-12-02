import { useEffect, useState } from "react";
import { calculateTime } from "../timer/CalcTime";
import { useTimeTrackContext } from "../context/TimeTrackerContext";
import {Box, Button, Text/* , Flex, HStack, SimpleGrid */} from "@chakra-ui/react";

const TimeCard = (props: any) => {
  const { times, editTime, editTask, removeTime } = useTimeTrackContext();
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timerArray, setTimerArray] = useState<Array<number | string>>([]);
  const [intervalId, setIntervalId] = useState<number>(0);
  const startTime = props.time.startTime;


  useEffect(() => {
    let timeArray: Array<number | string> = calculateTime(timeInSeconds);
    setTimerArray(timeArray);
  }, [timeInSeconds]);

  useEffect(() => {
    if (!props.time.endTime) {
      let interval: number = setInterval(() => {
        setTimeInSeconds((Date.now() - startTime) / 1000);
      }, 1000);
      setIntervalId(interval);
    } else
      setTimeInSeconds((props.time.endTime - props.time.startTime) / 1000);
  }, []);

  const handleStopButton = () => {
    clearInterval(intervalId);
    editTime(
      props.time.id,
      false,
      new Date().toISOString().slice(0, 10),
      Date.now()
    );
  };

  const handleRemove = () => {
    removeTime(props.time.id);
    handleEditTask(props.time.taskId);
  };

  const handleEditTask = (id: "string") => {
    let taskTimeSpent: Array<number> = [];
    const timeMachine = times.find((time: any) =>
      time.taskId == props.id
        ? taskTimeSpent.push(time.endTime - time.startTime)
        : undefined
    );
    let validationNation =
      taskTimeSpent.reduce((part, x) => part + x, 0) / 1000;
    if (isNaN(validationNation)) return;
    else editTask(id, props.title, validationNation);
  };

  useEffect(() => {
    if (props.id) {
      handleEditTask(props.id);
    } else return;
  }, [times]);

  return (
    <Box  display={"flex"} flexDirection={"row"} >
    
     
      <Text  display={"flex"} alignItems={"center"} className="timer-text">{timerArray[0]}:{timerArray[1]}:{timerArray[2]}</Text>
      {props.time.endTime ? (
        <Button onClick={handleRemove}>X</Button>
      ) : (
        <Button onClick={handleStopButton}>Stop</Button>
      )}
    </Box>
  );
};

export default TimeCard;