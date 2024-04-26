import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import CreateNewGroup from './CreateNewGroup';

const FabComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAddClicked, setIsAddClicked] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsAddClicked(!isAddClicked);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsAddClicked(false);
  };

  const [isCreateNewGroupOpen, setCreateNewGroupOpen] = useState(false);
  const handleCreateNewGroup = () => {
    setCreateNewGroupOpen(true);
  }

  return (
    <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Fab color="primary" onClick={handleClick}>
            {isAddClicked ? <CloseIcon /> : <AddIcon />}
        </Fab>
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style= {{
                marginTop: isAddClicked ? -48 : 16,
                backdropFilter: isAddClicked ? 'blur(5px)' : 'none', // Apply blur effect on add click
            }}
        >
            <Link to="managedepartments">
                <MenuItem onClick={handleClose}>
                    Manage Departments
                    <IconButton size="small" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                        <AccountTreeIcon />
                    </IconButton>
                </MenuItem>
            </Link>

            {/* <Link to="managedepartments"> */}
                <MenuItem onClick={handleClose}>
                    Manage Groups
                    <IconButton size="small" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                        <PeopleIcon />
                    </IconButton>
                </MenuItem>
            {/* </Link> */}

                <MenuItem onClick={handleCreateNewGroup}>
                    Create New Group
                    <IconButton size="small" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                        <AccountTreeIcon />
                    </IconButton>
                </MenuItem>
                <CreateNewGroup
                    open={isCreateNewGroupOpen}
                    onClose={() => setCreateNewGroupOpen(false)}
                />
            
            {/* <Link to="managedepartments"> */}
                <MenuItem onClick={handleClose}>
                    Manage Users
                    <IconButton size="small" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                        <PersonIcon />
                    </IconButton>
                </MenuItem>
            {/* </Link> */}
        </Menu>
    </div>
  );
};

export default FabComponent;
