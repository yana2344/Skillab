import React from "react";
import Header from "../../components/layout/Header";
import { Box } from "@mui/material";

function AddNewCourse() {
  return (
      <div>
        <Box m="20px">
          <Header title={"Add new course"} subtitle={"Here you can add a new course"} />
        </Box>
      </div>
  );
}

export default AddNewCourse;