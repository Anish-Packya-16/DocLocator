import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Menu, MenuItem } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const DropdownMenu = ({ anchorEl, onClose }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      sx={{ '& .MuiMenu-paper': { width: 240 } }}
    >
      <MenuItem component={Link} to="/admin/dash" onClick={onClose}>
        <DashboardIcon sx={{ mr: 1 }} />
        Dashboard
      </MenuItem>
      <MenuItem component={Link} to="/admin/doctors" onClick={onClose}>
        <PersonIcon sx={{ mr: 1 }} />
        DoctorsList
      </MenuItem>
      <MenuItem component={Link} to="/admin/adddoctors" onClick={onClose}>
        <PersonIcon sx={{ mr: 1 }} />
        AddDoctors
      </MenuItem>
      <MenuItem component={Link} to="/admin/usersList" onClick={onClose}>
        <GroupIcon sx={{ mr: 1 }} />
        Users
      </MenuItem>
      <MenuItem component={Link} to="/admin/appointments" onClick={onClose}>
        <CalendarTodayIcon sx={{ mr: 1 }} />
        Appointments
      </MenuItem>
      <MenuItem component={Link} to="/admin/schedules" onClick={onClose}>
        <ScheduleIcon sx={{ mr: 1 }} />
        Schedules
      </MenuItem>
    </Menu>
  );
};

export default DropdownMenu;
