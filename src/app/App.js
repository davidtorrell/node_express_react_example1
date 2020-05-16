import React, { Component } from 'react';
import { render } from 'react-dom';


class App extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
			tasks: [],
			_id: ''
		};
		this.addTask = this.addTask.bind(this);
		this.HandleChange = this.HandleChange.bind(this);
	}

	addTask(e) {
		if (this.state._id) {
			fetch(`/api/tasks/${this.state._id}`,{
				method: 'PUT',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				M.toast({ html: 'Tarea actualizada' });
				this.setState({ title: '', 'description': '', '_id': '' });
				this.fetchTask();
			});
		} else {
			fetch('/api/tasks', {
				method: 'POST',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
				.then(res => res.json())
				.then(data => {
					console.log(data)
					M.toast({ html: 'Tarea guardada' });
					this.setState({ title: '', 'description': '' });
					this.fetchTask();
				})
				.catch(err => console.log(err));
			console.log(this.state);
		}

		e.preventDefault();
	}

	componentDidMount() {
		console.log('component mount');
		this.fetchTask();
	}

	fetchTask() {
		fetch('/api/tasks')
			.then(res => res.json())
			.then(data => {
				// console.log(data);
				this.setState({ tasks: data });
				// console.log(this.state.tasks); 
			});

	}

	deleteTask(id) {
		if (confirm('Estas seguro que desea borrar?')) {
			fetch(`/api/tasks/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			})
				.then(res => res.json())
				.then(data => {
					console.log(data);
					M.toast({ html: 'Tarea eliminada' });
					this.fetchTask();
				});
			console.log('deleting task:  ', id);
		}
	}

	editTask(id) {
		fetch(`/api/tasks/${id}`)
			.then(res => res.json())
			.then(data => {
				this.setState({
					'title': data.title,
					'description': data.description,
					'_id': data._id
				})
			});
	}

	HandleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<div>
				{/* NAVIGATOR */}
				<nav className="light-blue darken-4">
					<div className="container">
						<a className="brand-logo" href="/">node + express + webpack + babel + react v1</a>
					</div>
				</nav>
				<div className="container">
					<div className="row">

						<div className="col s5">
							<div className="card">
								<div className="card-content">
									<form onSubmit={this.addTask}>
										<div className="row">
											<div className="input-field col s12">
												<input name="title" type="text" onChange={this.HandleChange} placeholder="Título Tarea" value={this.state.title} />
											</div>
										</div>


										<div className="row">
											<div className="input-field col s12">
												<textarea name="description" type="text" onChange={this.HandleChange} className="materialize-textarea" placeholder="Descripción de la tarea" value={this.state.description} />
											</div>
										</div>
										<button className="btn light-blue darken-4" type="submit">Enviar</button>
									</form>
								</div>
							</div>
						</div>

						<div className="col s7">
							<table>
								<thead>
									<tr>
										<th>Título</th>
										<th>Descripción</th>
									</tr>
								</thead>
								<tbody>
									{
										this.state.tasks.map(task => {
											return (
												<tr key={task._id}>
													<td>{task.title}</td>
													<td>{task.description}</td>
													<td>
														<button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)}><i className="material-icons">delete</i></button>
														<button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}><i className="material-icons">edit</i></button>
													</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						</div>
					</div>

				</div>

			</div>
		)
	}
}

export default App;  