import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import FilterListIcon from "@mui/icons-material/FilterList";

const Filter = ({ setSearchItems }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className=" basis-28">
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
      >
        <ListItemButton onClick={handleClick} className="flex flex-row-reverse">
          <FilterListIcon />
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton>
            <input
                type="checkbox"
                value="Italian"
                onChange={(e) => {
                  const isChecked = e.target.checked;

                  setSearchItems((prev) => {
                    return {
                      ...prev,
                      searchType: isChecked ? e.target.value : null, // Set "Indian" if checked, empty string if unchecked
                    };
                  });
                }}
              />
              <ListItemText primary="Italian" className="ml-2" />
             
            </ListItemButton>
            <ListItemButton>
              <input
                type="checkbox"
                value="Indian"
                onChange={(e) => {
                  const isChecked = e.target.checked;

                  setSearchItems((prev) => {
                    return {
                      ...prev,
                      searchType: isChecked ? e.target.value : null, // Set "Indian" if checked, empty string if unchecked
                    };
                  });
                }}
              />
              <ListItemText primary="Indian" className="ml-2" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default Filter;
