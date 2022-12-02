import { useTimeTrackContext } from "../context/TimeTrackerContext";
import { v4 as uuidv4 } from "uuid";
import {Box, Button, Flex, HStack, SimpleGrid} from "@chakra-ui/react";

export const Controls = (props: any) => {
  const { addTime, removeTask } = useTimeTrackContext();

  const handleTimer = () => {
    const uuid = uuidv4();
    const active = true;

    addTime(
      uuid,
      props.id,
      active,
      new Date().toISOString().slice(0, 10),
      Date.now()
    );
  };

  const handleRemove = (id: number) => {
    removeTask(id);
    console.log(`Task with id ${id} was deleted`);
  };

  return (
    <Box display={"flex"} justifyContent={"center"} > 
      <Button display={"flex"} justifyContent={"center"} onClick={handleTimer}>Time</Button>
       {props.removeButton ? ( 
        <Button onClick={() => handleRemove(props.id)}>Delete</Button>
        
      ) : null} 
    </Box>
  );
};
