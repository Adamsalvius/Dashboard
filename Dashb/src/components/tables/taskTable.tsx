import { useTimeTrackContext } from "../context/TimeTrackerContext";
import {Box, Thead, Tr, Th, Tbody, Table, Td} from "@chakra-ui/react";
const TaskTable = () => {
  const { tasks } = useTimeTrackContext();

  return (
    <Box border={"1px"} margin={2}>
      <Table>
        <Thead>
          <Tr>
            <Th fontWeight={"bold"} color={"white"} colSpan={2}>Tasks</Th>
          </Tr>
          <Tr >
            <Th color={"gray.200"}>Title</Th>
            <Th color={"gray.200"}>on project</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task: any) => (
            <Tr key={task.id}>
              <Td>{task.title}</Td>
              <Td>{task.projectTitle}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TaskTable;
