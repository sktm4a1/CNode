import React from "react";
import PropTypes from "prop-types"
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

import { topicPrimaryStyle, topicSecondStyle } from "./styles";
import { tabs } from "../../util/variable-define";

const Primary = ({ classes, topic }) => {
  return (
    <div className={classes.root}>
      <span className={topic.top ? classes.top : classes.tab}>
        {topic.top ? "置顶" : tabs[topic.tab]}
      </span>
      <span className={classes.title}>{topic.title}</span>
    </div>
  );
};
Primary.propTypes = {
  topic:PropTypes.object.isRequired,
  classes:PropTypes.object.isRequired
}

const Secondary = ({ classes, topic }) => {
  return (
    <div className={classes.root}>
      <span className={classes.username}>{topic.author.loginname}</span>
      <span className={classes.count}>
        <span className={classes.replyColor}>{topic.reply_count}</span>
        <span>/</span>
        <span>{topic.visit_count}</span>
      </span>
      <span className={classes.createAt}>创建时间：{new Date(topic.create_at).toLocaleString()}</span>
    </div>
  );
};
Secondary.propTypes = {
  topic:PropTypes.object.isRequired,
  classes:PropTypes.object.isRequired
}

const StyledPrimary = withStyles(topicPrimaryStyle)(Primary);
const StyledSecond = withStyles(topicSecondStyle)(Secondary);

const TopicListItem =  ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <Avatar src={topic.author.avatar_url} />
    </ListItemAvatar>
    <ListItemText
      disableTypography
      primary={<StyledPrimary topic={topic} />}
      secondary={<StyledSecond topic={topic} />}
    />
  </ListItem>
);
TopicListItem.propTypes = {
	topic:PropTypes.object.isRequired,
	onClick:PropTypes.func.isRequired
}
export default TopicListItem;