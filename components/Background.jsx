import React from "react";
import { Paper } from "@mui/material";

const Background = (props) => {
  const styles = {
    paperContainer: {
      backgroundImage: `url(${props.img})`,
      minHeight: "100vh",
      backgroundPosition: props.pos || "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: props.size || "cover",
    },
  };

  return <Paper style={styles.paperContainer}>{props.children}</Paper>;
};

export default Background;
