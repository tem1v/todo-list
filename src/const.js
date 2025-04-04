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

export {Status, StatusLabel};