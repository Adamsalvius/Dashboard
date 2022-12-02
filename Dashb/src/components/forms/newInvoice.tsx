import { useState, useEffect } from "react";
import { useTimeTrackContext } from "../context/TimeTrackerContext";
import { v4 as uuidv4 } from "uuid";
import { calculateTime } from "../timer/CalcTime";
import {Box, Flex, Text, Thead, Tr, Th, FormLabel, Tbody, Table, Td, HStack, Button, Select, Input, Center, SimpleGrid} from "@chakra-ui/react";
import { ModalType } from "../modal/modalType";

type ProjectType = {
  id: string;
  title: string;
  hourSek?: number;
  
};

function NewInvoiceForm(props: ModalType) {
  const [project, setProject] = useState<ProjectType | undefined>({
    id: "",
    title: "",
    hourSek: 0,
   
  });
  const { projects, tasks, addInvoice } = useTimeTrackContext();
  const [client, setclient] = useState<string>("");
  const [dueDate, setDueDate] = useState<any>("");
  const [amount, setAmount] = useState<number>(0);
  const [status, setStatus] = useState<any>("");
  const [billedTasks, setBilledTasks] = useState<any>([]);

  function handleSubmit(e: any) {
    e.preventDefault();
    addInvoice(
      uuidv4(),
      project?.id,
      status,
      dueDate,
      Math.round(amount),
      client,
      new Date().toISOString().split("T")[0]
    );
    props.toggle();
  }

  const handleChange = (e: any) => {
    setProject(JSON.parse(e.target.value) as ProjectType);
    setclient("");
    setStatus(""),
    setAmount(0);
    setBilledTasks([]);
  };

  const calcDate = () => {
    const msYear = Date.now() + 2592000000;
    let newDate = new Date(msYear);
    return newDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    setDueDate(calcDate);
  }, []);

  const calculator = () => {
    let timeCash: Array<number> = [];
    const cash = billedTasks.filter((item: any) =>
      timeCash.push(item.time_spent)
    );
    const reducer = timeCash.reduce((acc, curr) => acc + curr, 0);
    console.log(reducer);
    const adderator = reducer / 60 / 60;
    if (project?.hourSek) {
      return adderator * project?.hourSek;
    } else return;
  };

  useEffect(() => {
    const calcMoney = calculator();
    if (calcMoney) {
      setAmount(calcMoney);
      
    }
  }, [billedTasks]);

  const handleAddTask = (task: any) => {
    if (!billedTasks.find((btask: any) => btask.id == task.id)) {
      setBilledTasks([...billedTasks, task]);
    } else return;
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      {/* <button onClick={props.toggle}>X</button> */}
      {/* <Box>
        <h2>new invoice</h2>
      </Box> */}
      <Box display={"flex"} justifyContent={"center"} backgroundColor={"gray.200"}>
         
      <form  onSubmit={handleSubmit}>
      <Button backgroundColor={"red"}  onClick={props.toggle}>X</Button>
        <FormLabel htmlFor="project">Project</FormLabel>  
        <Select backgroundColor={"white"} onChange={handleChange} name="project" id="project">
         
          {projects.map((project: any) => (
            <option key={project.id} value={JSON.stringify(project)}>
              {project.title}
            </option>
          ))}
        </Select>
       
        <FormLabel htmlFor="projectRate">SEK/H</FormLabel>
        <Input type="number" disabled value={project?.hourSek} />
     
        <FormLabel htmlFor="status">Status</FormLabel>
        <Select backgroundColor={"white"} name="status" value={status} onChange={(e: any) => setStatus(e.target.value)} >
          <option value="unpaid">unpaid</option>
          <option value="paid">paid</option>
          <option value="late">late</option>
        </Select>
       
    
        <FormLabel htmlFor="due">Due </FormLabel>
        <Input
          type="date"
          name="due"
          id="due"
          value={dueDate}
          disabled
        />
      
        <FormLabel htmlFor="client">client name</FormLabel>
        <Input
        backgroundColor={"white"}
          type="text"
          onChange={(e: any) => setclient(e.target.value)}
          value={client}
        />
   
        <FormLabel htmlFor="amount">Total amount SEK </FormLabel>
        <Input type="number" disabled value={Math.round(amount)} />
     

        <Text>current task for invoice:</Text>
        <Box>
          {billedTasks.map((bTask: any) => (
            <Text key={bTask.id}>{bTask.title}</Text>
          ))}
        </Box>
        <Text>Choose task</Text>
        <Box>
          <Table>
            <Thead>
              <Tr>
                <th colSpan={4}>Tasks</th>
              </Tr>
              <Tr>
                <th>Title</th>
                <th>Time:H</th>
                <th>M</th>
                <th>S</th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks.map((task: any) =>
                task.projectId == project?.id ? (
                  <Tr onClick={() => handleAddTask(task)} key={task.id}>
                    <Td>{task.title}</Td>
                    <Td>{calculateTime(task.time_spent)[0]}</Td>
                    <Td>{calculateTime(task.time_spent)[1]}</Td>
                    <Td>{calculateTime(task.time_spent)[2]}</Td>
                  </Tr>
                ) : undefined
              )}
            </Tbody>
          </Table>
        </Box>
        <Button backgroundColor={"green"} type="submit">Submit</Button>
      </form>
      </Box>
    </Box>
  );
}
export default NewInvoiceForm;
