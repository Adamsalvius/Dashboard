import { useState, ReactNode } from "react";
import { useTimeTrackContext } from "../context/TimeTrackerContext";
import { v4 as uuidv4 } from "uuid";
import { ModalType } from "../modal/modalType";

import {Box, Text, Button, Flex, FormLabel, Input, HStack, SimpleGrid} from "@chakra-ui/react";



function NewProjectForm(props: ModalType) {
  const [projectTitle, setprojectTitle] = useState<string>("");
  
  const [projectRate, setProjectRate] = useState<number>();
  const { addProject } = useTimeTrackContext();

  function handleSubmit(e: any) {
    e.preventDefault();
    addProject(uuidv4(), projectTitle, projectRate, );
    setprojectTitle("");
    props.toggle();
  }

  return (
    <Box>
      <button onClick={props.toggle}>X</button>
      <Box>
        <Text display={"flex"} border={"2px"} justifyContent={"center"}>Create Project</Text>
      </Box>
      <Box display={"flex"} justifyContent={"center"} background={"blackAlpha.100"}>
      <form onSubmit={handleSubmit}>
        <FormLabel htmlFor="projectTitle">Project Title </FormLabel>
        <Input
          backgroundColor={"white"}
          type="text"
          onChange={(e) => setprojectTitle(e.target.value)}
          value={projectTitle}
          name="projectTitle"
          id="projectTitle"
          placeholder="Name"
          
          autoComplete="off"
        />
      
        <FormLabel htmlFor="projectRate"> Rate SEK </FormLabel>
        <Input
        backgroundColor={"white"}
          type="number"
          name="projectRate"
          id="projectRate"
          onChange={(e) => {
            setProjectRate(parseInt(e.target.value));
          }}
        />
    
        <Button backgroundColor={"green"} type="submit">Submit</Button>
      </form>

      </Box>
    </Box>
  );
}
export default NewProjectForm;
