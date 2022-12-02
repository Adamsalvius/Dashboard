import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
  } from "react";
  import { getInvoices, getProjects, getTasks, getTimes } from "../utils/api";
  import axios from "axios";
  
  type TimeContext = {
    addProject: Function;
    projects: any;
    editProject: Function;
    removeProject: Function;
    tasks: any;
    addTask: Function;
    editTask: Function;
    removeTask: Function;
    addTime: Function;
    times: any;
    editTime: Function;
    removeTime: Function;
    addInvoice: Function;
    invoices: any;
    editInvoice: Function;
    deleteInvoice: Function;
  
  };
  
  interface TimeProps {
    children: React.ReactNode;
  }
  
  export const TimeTrackContext = createContext<TimeContext | null>(
    null
  );
  
  export function TimeTrackerProvider({ children }: TimeProps) {
    const [projects, setProjects] = useState<Array<object>>([]);
    const [tasks, setTasks] = useState<Array<object>>([]);
    const [times, setTimes] = useState<Array<object>>([]);
    const [invoices, setInvoices] = useState<Array<object>>([]);
  
    const updateProjects = useCallback(() => {
      getProjects().then((res) => setProjects(res.data));
    }, []);
    useEffect(updateProjects, []);
  
    const addProject = useCallback(
      (id: string, title: string, hourSek: number) => {
        axios
          .post("http://localhost:3000/projects", {
            id,
            title,
            hourSek,
           
          })
          .then(() => {
            updateProjects();
          });
      },
      []
    );
  
    const editProject = useCallback(
      (id: string, title?: string, hourSek?: number) => {
        axios
          .patch(`http://localhost:3000/projects/${id}`, {
            title,
            hourSek,
          })
          .then(() => {
            updateProjects();
          });
      },
      []
    );
  
    const removeProject = useCallback((id: string) => {
      axios.delete(`http://localhost:3000/projects/${id}`).then(() => {
        updateProjects();
        updateTasks();
        updateTimes();
      });
    }, []);
  
    const updateTasks = useCallback(() => {
      getTasks().then((response) => setTasks(response.data));
    }, []);
    useEffect(updateTasks, []);
  
    const addTask = useCallback(
      (
        id: string,
        projectId: string,
        projectTitle: string,
        title: string,
        time_spent: number,
        invoiced: string
      ) => {
        axios
          .post("http://localhost:3000/tasks", {
            id,
            projectId,
            projectTitle,
            title,
            time_spent,
            invoiced,
          })
          .then(() => {
            updateTasks();
          });
      },
      []
    );
  
    const editTask = useCallback(
      (id: string, title?: string, time_spent?: number) => {
        axios
          .patch(`http://localhost:3000/tasks/${id}`, {
            title,
            time_spent,
          })
          .then(() => {
            updateTasks();
          });
      },
      []
    );
  
    const paiding = useCallback(
      (id: string, projectId: string, status:string, due:string, amount:number, clientName: string, timevoiced:string) => {
        axios
          .patch(`http://localhost:3000/invoices/${id}`, {
            id,
            projectId,
            status,
            due,
            amount,
            clientName,
            timevoiced,
          })
          .then(() => {
            updateInvoices();
          });
      },
      []
    );
  
    const removeTask = useCallback((id: number) => {
      axios.delete(`http://localhost:3000/tasks/${id}`).then(() => {
        updateTasks();
        updateTimes();
      });
    }, []);
  
    const updateTimes = useCallback(() => {
      getTimes().then((response) => setTimes(response.data));
    }, []);
    useEffect(updateTimes, []);
  
    const addTime = useCallback(
      (
        id: string,
        taskId: string,
        active: boolean,
        startDate: string,
        startTime: number,
        endDate?: string,
        endTime?: number,
        totalTimeS?: number
      ) => {
        axios
          .post("http://localhost:3000/timelogs", {
            id,
            taskId,
            active,
            startDate,
            startTime,
            endDate,
            endTime,
            totalTimeS,
          })
          .then(() => {
            updateTimes();
            updateTasks();
          });
      },
      []
    );
  
    const editTime = useCallback(
      (id: string, active: boolean, endDate: string, endTime: number) => {
        axios
          .patch(`http://localhost:3000/timelogs/${id}`, {
            active,
            endDate,
            endTime,
          })
          .then(() => {
            updateTimes();
          });
      },
      []
    );
  
    const removeTime = useCallback((id: number) => {
      axios.delete(`http://localhost:3000/timelogs/${id}`).then(() => {
        updateTimes();
        updateTasks();
        updateProjects();
      });
    }, []);
  
    const updateInvoices = useCallback(() => {
      getInvoices().then((res) => setInvoices(res.data));
    }, []);
    useEffect(updateInvoices, []);
  
    const addInvoice = useCallback(
      (
        id: string,
        projectId: string,
        status: string,
        due: string,
        amount: number,
        clientName: string,
        timevoiced: string
      ) => {
        axios
          .post("http://localhost:3000/invoices", {
            id,
            projectId,
            status,
            due,
            amount,
            clientName,
            timevoiced,
          })
          .then(() => {
            updateInvoices();
          });
      },
      []
    );
  
  
   
    const editInvoice = useCallback(
      (
        id: number,
        status: string,
        due: string,
        amount: number,
        clientName: string
      ) => {
        axios
          .patch(`http://localhost:3000/invoices/${id}`, {
            status,
            due,
            amount,
            clientName,
          })
          .then(() => updateInvoices());
      },
      []
    );
  
    const deleteInvoice = useCallback((id: number) => {
      axios.delete(`http://localhost:3000/invoices/${id}`).then(() => {
        updateInvoices();
      });
    }, []);
  
    const providerValue = useMemo(() => {
      return {
        projects,
        addProject,
        editProject,
        removeProject,
        tasks,
        addTask,
        editTask,
        removeTask,
        times,
        addTime,
        editTime,
        removeTime,
        invoices,
        addInvoice,
        editInvoice,
        deleteInvoice/* ,
        addpaid */
      };
    }, [
      projects,
      addProject,
      editProject,
      removeProject,
      tasks,
      addTask,
      editTask,
      removeTask,
      times,
      addTime,
      editTime,
      removeTime,
      invoices,
      addInvoice,
      editInvoice,
      deleteInvoice,
   /*    addpaid, */
      paiding,
    ]);
  
    return (
      <TimeTrackContext.Provider value={providerValue}>
        {children}
      </TimeTrackContext.Provider>
    );
  }
  
  export function useTimeTrackContext() {
    const context = useContext(TimeTrackContext);
  
    if (!context) {
      throw new Error("UseTimeTrackContext: Outside the Provider");
    }
    return context;
  }
  