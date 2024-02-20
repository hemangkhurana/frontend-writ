import React from "react";
// import {  } from "@fortawesome/react-fontawesome";
import { GrSchedules, GrTask } from "react-icons/gr";
import { AiFillHome } from "react-icons/ai";
import {
  FaBalanceScale,
  FaCalendarAlt,
  FaFileAlt,
  FaSearch,
  FaClipboard,
  FaClipboardCheck,
  FaClipboardList
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"
import SendIcon from '@mui/icons-material/Send';
import { useWrit } from "../../pages/institutionalMemory/WritContext";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from "@mui/material/Backdrop"; // Import Backdrop

export const Navbar = () => {
  const links = [
    { name: 'Add Writ', route : "", icon: <FaClipboard size={40}/>}, 
  ];

  const {
    loading, setLoading,
  } = useWrit();

  return (
    <>
      <Backdrop
          sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              color: "#fff",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(2px)", // Adjust the blur amount as needed
          }}
          open={loading}
      >
          <CircularProgress color="inherit" />
      </Backdrop>
      <nav className={styles.navbarContainer}>
        {links.map((item, index) => {
          return (
            <NavLink
              to={"/user/" + item.route}
              style={{padding: "20px 0px" }}
              className={({ isActive, isPending }) =>
                isActive ? "nav-link" : "nav-link-inactive"
              }
            >
              <div className={styles.iconContainer}>
                {item.icon}
              </div>
              <div className={styles.nameContainer}>
                {item.name}
              </div>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};
