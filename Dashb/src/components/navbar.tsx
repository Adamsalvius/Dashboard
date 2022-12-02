
import { NavLink, useNavigate } from "react-router-dom";

import {Box} from "@chakra-ui/react";



const Navbar = () => {
  
  const navigationItems = {
    navbar: [
        {
            name: "Dashboard",
            to: "/dashboard",
            text: "dashboard"
        },
        {
            name: "Timer",
            to: "/timer",
            text: "timer" 
        },
        {
            name: "Edit",
            to: "/edit",
            text: "edit"
        },
     


    ]
}
  return (
    <Box    display={"flex"} position={"fixed"} backgroundColor={"gray.400"} w={"100vw"} h={8} top={0} justifyContent={"center"}
   zIndex={20}>
     
        <Box display={"flex"} flexDirection={"row"}  className="navButton" >
          {navigationItems.navbar.map((item) => (
            <NavLink
              key={item.text}
             
              className={({ isActive }) =>
                isActive ? "navbactive" :"navbinactive"
              }
              to={item.to}
            >
              {item.name}
            </NavLink>
          ))}
       
        </Box>

      <Box>
     
      </Box>
    </Box>
  );
};

export default Navbar;
