import { useTimeTrackContext } from "./context/TimeTrackerContext";
import useModal from "./modal/useModal";
import TaskComp from "./Cards/TaskComp";

import {Box, Button, /* Text,  Flex, HStack, SimpleGrid */} from "@chakra-ui/react";

import NewTaskForm from "./forms/newTask";
import { ModalType } from "./modal/modalType";

function NewTaskModal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <Box onClick={props.toggle}>
          <Box backgroundColor={"gray.200"} onClick={(e) => e.stopPropagation()} >
            <NewTaskForm isOpen={props.isOpen} toggle={props.toggle} />
          </Box>
        </Box>
      )}
    </>
  );
}


const Tasks = () => {
  const { tasks, removeTask } = useTimeTrackContext();
  const { isOpen, toggle } = useModal();


  

  return (
    <Box /* className="tasks" */>
      

      <Box display={"flex"} justifyContent={"center"}>
        { isOpen? <></> :
        <Button onClick={toggle}>Add Task</Button> }
        <NewTaskModal isOpen={isOpen} toggle={toggle} />
      </Box>
   
        <Box display={"flex"} justifyContent={"center"}>
        {tasks.map((task: any) => (
          <Box key={task.id}>
            
            <TaskComp removeButton={true} {...task} />
          
        
          </Box>
        ))}
   
      </Box>
    </Box>
  );
};

export default Tasks;
