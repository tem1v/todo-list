const Status = {
	BACKLOG: 'backlog',
	PROCESSING: 'processing',
	COMPLETE: 'complete',
	BASKET: 'basket'
};

const StatusLabel = {
    [Status.BACKLOG]: 'backlog',
    [Status.PROCESSING]: 'processing',
    [Status.COMPLETE]: 'complete',
    [Status.BASKET]: 'basket',
};

export {Status, StatusLabel};