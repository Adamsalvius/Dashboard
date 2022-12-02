import { useState, ReactNode } from "react";
import { useTimeTrackContext } from "../context/TimeTrackerContext";
import { v4 as uuidv4 } from "uuid";
import {Box, Text, Button, /* Flex, HStack, SimpleGrid, */ Select, FormLabel, Input} from "@chakra-ui/react";
import { ModalType } from "../modal/modalType";

function NewTaskForm(props: ModalType) {
  const [project, setProject] = useState({
    id: " ",
    title: " ",
  });
  const [taskTitle, settaskTitle] = useState<string>("");
  const time_spent = 0;
  const invoiced = "no";
  const [chosenProject, setChosenProject] = useState(false);
  const { addTask, projects } = useTimeTrackContext();

  function handleSubmit(e: any) {
    e.preventDefault();
    if (project.id == " " || taskTitle == " ") {
      console.log("Invalid data, not successfull");
    } else {
      addTask(
        uuidv4(),
        project.id,
        project.title,
        taskTitle,
        time_spent,
        invoiced
      );
      console.log("task successfully added");
      props.toggle();
    }
  }

  const handleChange = (e: any) => {
    if (e.target.value == " ") {
      setProject({ id: " ", title: " " });
      console.log("This is an invalid project");
    } else {
      setProject(JSON.parse(e.target.value));
      setChosenProject(true);
    }
  };

  return (
    <Box>
      <Button backgroundColor={"red.400"} onClick={props.toggle}>X</Button>
      <Box  w={"20vw"}>
        <Text fontWeight={"bold"} display={"flex"} justifyContent={"center"}>Create Task</Text>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormLabel htmlFor="taskTitle">Task Title </FormLabel>
        <Input
          backgroundColor={"white"}
          type="text"
          onChange={(e) => settaskTitle(e.target.value)}
          value={taskTitle}
          name="taskTitle"
          id="taskTitle"
          placeholder="Title"
          autoComplete="off"
        />
        <FormLabel htmlFor="project">Project</FormLabel>
        <Select backgroundColor={"white"} required onChange={handleChange} name="project" id="project" >
          {projects.map(
            (project: {
              id: number;
              title: string;
              hourSek: number;
            }) => (
              <option  key={project.id} value={JSON.stringify(project)}>
                {project.title}
              </option>
            )
          )}
        </Select>

       

      <Box display={"flex"} justifyContent={"right"}>
          <Button  backgroundColor={"green.200"} type="submit">Submit</Button>
          </Box>
     
      </form>
    </Box>
  );
}
export default NewTaskForm;
