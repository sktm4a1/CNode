import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'

const styles = {
	root:{
		width:'100%'
	},
	flex:{
		flex:1
	},
	button:{
		marginRight:20
	}
}

class MainAppBar extends React.Component {
	constructor(){
		super()
		this.onHomeIconClick = this.onHomeIconClick.bind(this)
	}

	onHomeIconClick(){

	}
	createButtonClick(){

	}
	loginButtonClick(){

	}

	render() {
		const classes = this.props.classes
		return (
				<div>
					<AppBar position="fixed">
						<ToolBar>
							<IconButton  onClick={this.onHomeIconClick}>
								<HomeIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" className={classes.flex}>CNode</Typography>
							<Button color="secondary" variant="contained" className={classes.button} onClick={this.createButtonClick.bind(this)}>新建话题</Button>
							<Button variant="outlined" onClick={this.loginButtonClick.bind(this)}>登录</Button>
						</ToolBar>
					</AppBar>
				</div>
			)
		}
	}

export default withStyles(styles)(MainAppBar)