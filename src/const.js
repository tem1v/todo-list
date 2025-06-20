const Status = {
	BACKLOG: 'backlog',
	PROCESSING: 'processing',
	COMPLETE: 'complete',
	BASKET: 'basket',
};

const StatusLabel = {
    [Status.BACKLOG]: 'Бэклог',
    [Status.PROCESSING]: 'В процессе',
    [Status.COMPLETE]: 'Готово',
    [Status.BASKET]: 'Корзина',
};

const UserAction = {
    UPDATE_TASK: "UPDATE_TASK",
    ADD_TASK: "ADD_TASK",
    DELETE_TASK: "DELETE_TASK",
};

const UpdateType = {
    PATCH: "PATCH",
    MINOR: "MINOR",
    MAJOR: "MAJOR",
    INIT: "INIT",
};

export {Status, StatusLabel, UpdateType, UserAction};