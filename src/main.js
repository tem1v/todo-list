import HeaderComponent from "../view/header-component.js";
import FormAddTaskComponent from "../view/form-add-task-component.js";
import TasksBoardComponent from "../view/tasks-board-component.js";
import TasksListComponent from "../view/tasks-list-component.js";
import TaskComponent from "../view/task-component.js";
import { render, RenderPosition } from "../src/framework/render.js";


const bodyContainer = document.body;
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

const formContainer = document.querySelector('.add-task')
render(new FormAddTaskComponent(), formContainer, RenderPosition.AFTERBEGIN);


render(new TasksBoardComponent(), formContainer, RenderPosition.AFTEREND);
const tasksBoard = document.querySelector(".tasks-categories");

for(let i=0; i<4; i++){
	render(new TasksListComponent(), tasksBoard, RenderPosition.AFTERBEGIN);

	const tasksList = document.querySelector(".backlog-list");
	for(let j=0; j<4; j++){
		render(new TaskComponent(), tasksList, RenderPosition.AFTERBEGIN);
	}
}
