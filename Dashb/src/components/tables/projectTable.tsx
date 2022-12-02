import { useTimeTrackContext } from "../context/TimeTrackerContext";
import {Box, Flex, Text, Thead, Tr, Th, Tbody, Table, Td, HStack, Button,  Center, SimpleGrid} from "@chakra-ui/react";
const ProjectTable = () => {
  const { projects, tasks } = useTimeTrackContext();

  const calcTasksOnProject = (project: any) => {
    const data = tasks.filter((task: any) => task.projectId == project.id);
    return data.length;
  };

  return (
    <Box border={"1px"}>
      <Table>
        <Thead >
          <Tr >
            <Th color={"white"}  colSpan={2}>Projects</Th>
          </Tr>
          <Tr>
            <Th color={"gray.200"}>Title</Th>
            <Th color={"gray.200"}>No. tasks</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((project: any) => (
            <Tr key={project.id}>
              <Td>{project.title}</Td>
              <Td>{calcTasksOnProject(project)}</Td>
        
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProjectTable;
