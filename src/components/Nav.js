import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

function ListItemLink (props) {
	const { classes, to, open, name, button, loc, ...other } = props;
	const listItem = button ? loc === `/projects/${to}` ? (
		<ListItem button component={Link} to={to} {...other}>
			<ListItemText disableTypography primary={name} className={classes.selected} />
			{open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
		</ListItem>
	) : to === loc ? (
		<ListItem button component={Link} to={to} {...other}>
			<ListItemText disableTypography primary={name} className={classes.selected} />
			{open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
		</ListItem>
	) : (
		<ListItem button component={Link} to={to} {...other}>
			<ListItemText primary={name} />
			{open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
		</ListItem>
	) : (
		<ListItem button {...other}>
			<ListItemText primary={name} />
			{open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
		</ListItem>
	);
	return <li> {listItem} </li>;
}

const styles = (theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		padding: '10px'
	},
	lists: {
		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing(4)
	},
	progress: {
		color: (props) => props.colorPrimary[500],
		marginTop: '8px',
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	selected: {
		color: (props) => props.colorPrimary[500],
		fontWeight: '500',
		fontSize: '1rem',
		fontFamily: 'Roboto',
		lineHeight: '1.5'
	}
});

class Nav extends Component {
	state = {
		open: true
	};

	handleClick = () => {
		this.setState((state) => ({ open: !state.open }));
	};

	render () {
		const { classes, closeDrawer, loc } = this.props;
		let { db } = this.props;
		if (db !== null && db.projects.length === 0) db = null;
		return (
			<div className={classes.root}>
				<nav className={classes.lists} aria-label='nav buttons'>
					<List>
						<div onClick={closeDrawer}>
							<ListItemLink to='/' name='Home' button={true} loc={loc} classes={classes} />
							<List>
								<ListItem component={Link} to='/projects/new' button>
									<ListItemIcon>
										<Icon>add_circle</Icon>
									</ListItemIcon>
									{loc === '/projects/new' ? (
										<ListItemText disableTypography primary='Add Project' className={classes.selected} />
									) : (
										<ListItemText primary='Add Project' />
									)}
								</ListItem>
							</List>
						</div>
						<ListItemLink
							to='/projects'
							open={this.state.open}
							onClick={this.handleClick}
							name='Projects'
							button={false}
						/>
						<Collapse component='li' in={this.state.open} timeout='auto' unmountOnExit>
							<List disablePadding>
								<div onClick={closeDrawer}>
									{db !== null ? (
										db.projects.map((project) => (
											<ListItemLink
												to={`/projects/${project.path}`}
												className={classes.nested}
												name={project.name}
												button={true}
												key={project.uid}
												loc={loc}
												classes={classes}
											/>
										))
									) : (
										<CircularProgress size={24} className={classes.progress} />
									)}
								</div>
							</List>
						</Collapse>
					</List>
				</nav>
			</div>
		);
	}
}

export default withStyles(styles)(Nav);
