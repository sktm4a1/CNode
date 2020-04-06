import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";

const styles = {
  root: {
    width: "100%"
  },
  flex: {
    flex: 1
  },
  button: {
    marginRight: 20
  }
};

class MainAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onHomeIconClick = () => {};
  createButtonClick = () => {
    console.log("新建话题");
  };
  loginButtonClick = () => {
    console.log("登录");
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <ToolBar>
            <IconButton color="secondary" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography
			  variant="h4"
			  color="secondary"
              className={classes.flex}
            >
              CNode
            </Typography>
            <Button
              raised="true"
              color="secondary"
              variant="contained"
              className={classes.button}
              onClick={this.createButtonClick}
            >
              新建话题
            </Button>
            <Button variant="outlined" onClick={this.loginButtonClick}>
              登录
            </Button>
          </ToolBar>
        </AppBar>
      </div>
    );
  }
}
MainAppBar.propTypes = {
	classes:PropTypes.object.isRequired
}
export default withStyles(styles)(MainAppBar);
