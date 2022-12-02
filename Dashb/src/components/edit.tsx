import { Outlet } from "react-router-dom";

import {  NavLink } from "react-router-dom";
import {Box} from "@chakra-ui/react";
const Edit = () => {
  let activeStyle = {
    textDecoration: "underline",
    color:"green",
    fontWeight:"bold",}
  return (
    <>

  <Box marginTop={10} marginBottom={10} display={"flex"} justifyContent={"center"}>
      <Box display={"flex"} fontSize={20} m={2}>
        
        <NavLink
        
          
          to="projects"
         
          style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
        >
          Projects
        </NavLink>
        <NavLink
          to="tasks"
          style={({ isActive }) =>
          isActive ? activeStyle : undefined
        }>
          Tasks
        </NavLink>
      </Box>
    </Box>
      <Outlet />
    </>
  );
};

export default Edit;
