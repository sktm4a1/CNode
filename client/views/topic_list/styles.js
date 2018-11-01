export const topicPrimaryStyle  = (theme) => {
	return {
		root:{
			display:'flex',
			alignItems:'center'
		},
		title:{
			color:'#555',
			fontWeight:700
		},
		tab:{
			backgroundColor:theme.palette.primary[500],
			textAlign:'center',
			display:'inline-block',
			padding:'0 6px',
			color:'#fff',
			borderRadius:'3px',
			marginRight:10,
			fontSize:'12px'
		}
	}
}

export const topicSecondStyle = (theme) => {
	return {
		root:{
			display:'flex',
			alignItems:'center',
			paddingTop:3,
			color:'#3ef666',
			fontSize:'14px',
			fontFamily:'Microsoft Yahei'
		},
		count:{
			textAlign:'center',
			marginRight:20
		},
		username:{
			marginRight:20,
			color:'#9e9e9e',
			fontSize:'16px'
		},
		replyColor:{
			color:theme.palette.secondary[300]
		},
		createAt:{
			marginLeft:'315px'
		}
	}
}

export default topicPrimaryStyle