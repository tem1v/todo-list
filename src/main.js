import HeaderComponent from "../view/header-component.js";
import FormAddTaskComponent from "../view/form-add-task-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import { render, RenderPosition } from "../src/framework/render.js";
import TasksBoardComponent from "../view/tasks-board-component.js";
import TasksModel from "./model/tasks-model.js";


const bodyContainer = document.body;
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

const formContainer = document.querySelector('.add-task')
render(new FormAddTaskComponent({onClick: handleNewTaskButtonClick}), formContainer, RenderPosition.AFTERBEGIN);

function handleNewTaskButtonClick(){
	tasksBoardPresenter.createTask();
}

const tasksModel = new TasksModel();

const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: formContainer,
    tasksModel
});
tasksBoardPresenter.init();



