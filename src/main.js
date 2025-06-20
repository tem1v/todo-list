import HeaderComponent from "../view/header-component.js";
import FormAddTaskComponent from "../view/form-add-task-component.js";
import TasksBoardPresenter from "./presenter/tasks-board-presenter.js";
import { render, RenderPosition } from "../src/framework/render.js";
import TasksModel from "./model/tasks-model.js";
import TasksApiService from "./tasks-api-service.js";


const END_POINT = "https://680c8a2d2ea307e081d43b9f.mockapi.io";
const bodyContainer = document.body;
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

const formContainer = document.querySelector('.add-task')
render(new FormAddTaskComponent({onClick: handleNewTaskButtonClick}), formContainer, RenderPosition.AFTERBEGIN);

function handleNewTaskButtonClick(){
	tasksBoardPresenter.createTask();
}

const tasksModel = new TasksModel({
	tasksApiService: new TasksApiService(END_POINT)
});

const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: formContainer,
    tasksModel
});
tasksBoardPresenter.init();



