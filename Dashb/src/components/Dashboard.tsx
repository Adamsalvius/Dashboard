import { useEffect, useState } from "react";
import { useTimeTrackContext } from "./context/TimeTrackerContext";
import TimeCard from "./Cards/controls";
import ProjectTable from "./tables/projectTable";
import TaskTable from "./tables/taskTable";
import { calculateTime } from "./timer/CalcTime";
import useModal from "./modal/useModal";
import NewInvoiceModal from "./modal/newInvoiceModal";
import {Box, Flex, Text, Thead, Tr, Th, Table, Td, Button} from "@chakra-ui/react";


const Dashboard = () => {
  const { projects, tasks, times, invoices, deleteInvoice } = useTimeTrackContext();
  const [timeSpan, setTimeSpan] = useState<string>("month");
  const [activeTime, setActiveTime] = useState<Array<string | number>>([]);
  const [billedSEK, setbilledSEK] = useState<Array<number>>();
  const { isOpen, toggle } = useModal();
 


  const handleRemove = (id: number) => {
    deleteInvoice(id);
    console.log(`Project with id ${id} has been successfully removed`);
  };


  const handleChange = (e: any) => {
    setTimeSpan(e.target.value);
  };
  
  const calcTotalTimeMonth = () => {
    const filteredTimes = times.filter(
      (time: any) => time.startTime > Date.now() - 2592000000
    );
    const addTimes = filteredTimes.map(
      (time: any) => (time.endTime - time.startTime) / 1000
    );
    const timeArray = calculateTime(
      addTimes.reduce((acc: any, curr: any) => acc + curr, 0)
    );
    setActiveTime(timeArray);
  };
/* one year in ms */
  const updatesum = () => {
    const msYear = Date.now() - 31556926000;
    let newDate = new Date(msYear);
     const ISOmagic = newDate.toISOString().split("T")[0]; 
    const filteredInvoices = invoices.filter(
      (voice: any) =>
        Number(voice.timevoiced.split("-")[0]) >
        Number(ISOmagic.split("-")[0])
    );
    const reducero = filteredInvoices.map((item: any) => item.amount);
    const reducer = reducero.reduce((acc: any, curr: any) => acc + curr, 0);
    setbilledSEK(reducer);
  };

  useEffect(() => {
    updatesum();
  }, []);

  useEffect(() => {
    calcTotalTimeMonth();
  }, [times]);

  return (
    <Box  >
      
      <Box display={"flex"} justifyContent={"center"} marginTop={100} >
      
      <Box>
        <Text>Active projects: {projects.length}</Text>

        <Text>Active tasks: {tasks.length}</Text>

        <Text>Invoices created: {invoices.length}</Text>
        
        <Text>
          past month time: {activeTime[0]}:{activeTime[1]}:
          {activeTime[2]}{" "}
        </Text>
        <Text>Total: {billedSEK} SEK </Text>
        </Box>
        <Button onClick={toggle} zIndex={2}>new invoice</Button>
      </Box>
      
      <NewInvoiceModal  isOpen={isOpen} toggle={toggle} />
      <Flex wrap={"wrap"} justifyContent={"center"}  margin={20}  >

      <Box  > 
      <Table    border={"1px"} >
        <Thead >
          <Tr>
            <Th w={10} color={"white"} colSpan={5}>Invoices</Th>
          </Tr>
          <Tr>
          <Th color={"gray.200"}>Status</Th>
          <Th color={"gray.200"}>Due</Th>
           
            
           
            <Th color={"gray.200"}>Amount</Th>
            <Th color={"gray.200"}>client</Th>
            <Th color={"gray.200"}>Delete</Th>
          </Tr>
        </Thead>
   
          {invoices.map((voice: any) => (
            <Tr key={voice.id}>
                <Td>{voice.status} 
            
            </Td>
            
            <Td>{voice.due}</Td>
            <Td>
              {voice.amount} SEK
              </Td>
              <Td>{voice.clientName}</Td>
            
             
             
              
              <Td><Button onClick={() => {handleRemove(voice.id)}}>X</Button>
              
              </Td>
            </Tr>
            
          ))}
      
        
     </Table>
     <br/>
  
  <Box w={2} background={"blue"}></Box>
      <ProjectTable  />
      <Box w={2} background={"blue"}></Box>
      <TaskTable />
      
      </Box>
     
     

</Flex>
<Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
      <Box  display={"flex"} justifyContent={"center"}  background={"gray.300"}>
      <Text mt={"2vh"} marginBottom={20}>
        logged time{/* {" "} */}
       
        <select onChange={handleChange}>
          <option value="month">30 days</option>
          
          <option value="active">active tasks</option>
          <option value="allTime">all time</option>
        </select>{" "}
        
      </Text>
      </Box>

      </Box>
{tasks.map((task: any) => (
        <Box key={task.id}>
          <Text display={"flex"} justifyContent={"center"} background={"gray.400"}>{task.title}</Text>
          <Box>
            {timeSpan == "month"
              ? times.map((time: any) => (
                  <Box display={"flex"} justifyContent={"center"} key={time.id}>
                    {time.taskId == task.id &&
                    time.startTime > Date.now() - 2592000000 ? (
                      <TimeCard time={time} />
                    ) : undefined}
                  </Box>
                ))
              : timeSpan == "allTime"
              ? times.map((time: any) => (
                  <Box display={"flex"} justifyContent={"center"} key={time.id}>
                    {time.taskId == task.id ? (
                      <TimeCard time={time} />
                    ) : undefined}
                  </Box>
                ))
              : timeSpan == "active"
              ? times.map((time: any) => (
                  <Box display={"flex"} justifyContent={"center"} key={time.id}>
                    {time.taskId == task.id && time.active ? (
                      <TimeCard time={time} />
                    ) : undefined}
                  </Box>
                ))
              : undefined}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Dashboard;
