import { useTimeTrackContext } from "./context/TimeTrackerContext";
import NewProjectModal from "./modal/newProjectModal";
import useModal from "./modal/useModal";
import {Box, Text, Button} from "@chakra-ui/react";

const Projects = () => {
  const { projects, removeProject } = useTimeTrackContext();
  const { isOpen, toggle } = useModal();

  const handleRemove = (id: number) => {
    removeProject(id);
    console.log(`Project id ${id} was deleted`);
  };
  /* edit  edit */

  return (
    <Box className="projects">
     

      <Box display={"flex"} justifyContent={"center"}>
        {!isOpen?
         <Button onClick={toggle}>Add Project</Button> : <></>}
        <NewProjectModal isOpen={isOpen} toggle={toggle} />
      </Box>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} >
        {projects.map((project: any) => (
          <Box  display={"flex"} flexDirection={"column"} justifyContent={"center"} margin={2} border={"2px"} key={project.id}>
          
            <Text display={"flex"} justifyContent={"center"}>
              {project.title}
            
            </Text>
            <Text>{project.hourSek} SEK/H</Text>
         
            <Button onClick={() => handleRemove(project.id)}>Delete</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Projects;