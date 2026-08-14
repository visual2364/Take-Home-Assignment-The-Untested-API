const request = require('supertest');
const app = require('../src/app');
const taskService = require('../src/services/taskService');

describe('Tasks API', () => {

    beforeEach(() => {
        taskService._reset();
    });

    test('should create a new task', async () => {

        const response = await request(app)
            .post('/tasks')
            .send({
                title: 'API Task'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('API Task');

    });


    test('should get all tasks', async () => {

        await request(app)
            .post('/tasks')
            .send({
                title: 'Task 1'
            });

        await request(app)
            .post('/tasks')
            .send({
                title: 'Task 2'
            });

        const response = await request(app)
            .get('/tasks');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].title).toBe('Task 1');
        expect(response.body[1].title).toBe('Task 2');

    });


    test('should get a task by id', async () => {

        const createResponse = await request(app)
            .post('/tasks')
            .send({
                title: 'Find This Task'
            });

        const taskId = createResponse.body.id;

        const response = await request(app)
            .get(`/tasks/${taskId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(taskId);
        expect(response.body.title).toBe('Find This Task');

    });


    test('should assign a task to a user', async () => {

        const createResponse = await request(app)
            .post('/tasks')
            .send({
                title: 'Assign Me'
            });

        const taskId = createResponse.body.id;

        const response = await request(app)
            .patch(`/tasks/${taskId}/assign`)
            .send({
                assignee: 'Vishal'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.assignee).toBe('Vishal');

    });


    test('should return 404 when assigning a task that does not exist', async () => {

        const response = await request(app)
            .patch('/tasks/invalid-id/assign')
            .send({
                assignee: 'Vishal'
            });

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Task not found');

    });


    test('should return 400 when assignee is empty', async () => {

        const createResponse = await request(app)
            .post('/tasks')
            .send({
                title: 'Test Task'
            });

        const taskId = createResponse.body.id;

        const response = await request(app)
            .patch(`/tasks/${taskId}/assign`)
            .send({
                assignee: ''
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('assignee is required');

    });


    test('should filter tasks by status', async () => {

        await request(app)
            .post('/tasks')
            .send({
                title: 'Todo Task',
                status: 'todo'
            });

        await request(app)
            .post('/tasks')
            .send({
                title: 'Done Task',
                status: 'done'
            });

        const response = await request(app)
            .get('/tasks?status=todo');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe('Todo Task');

    });


    test('should return paginated tasks', async () => {

        await request(app)
            .post('/tasks')
            .send({
                title: 'Task 1'
            });

        await request(app)
            .post('/tasks')
            .send({
                title: 'Task 2'
            });

        await request(app)
            .post('/tasks')
            .send({
                title: 'Task 3'
            });

        const response = await request(app)
            .get('/tasks?page=1&limit=2');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].title).toBe('Task 1');
        expect(response.body[1].title).toBe('Task 2');

    });


    test('should update a task', async () => {

        const createResponse = await request(app)
            .post('/tasks')
            .send({
                title: 'Old Task'
            });

        const taskId = createResponse.body.id;

        const response = await request(app)
            .put(`/tasks/${taskId}`)
            .send({
                title: 'Updated Task'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Updated Task');

    });


    test('should complete a task', async () => {

        const createResponse = await request(app)
            .post('/tasks')
            .send({
                title: 'Complete Task'
            });

        const taskId = createResponse.body.id;

        const response = await request(app)
            .patch(`/tasks/${taskId}/complete`);

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('done');
        expect(response.body.completedAt).not.toBeNull();

    });


    test('should delete a task', async () => {

        const createResponse = await request(app)
            .post('/tasks')
            .send({
                title: 'Delete Task'
            });

        const taskId = createResponse.body.id;

        const response = await request(app)
            .delete(`/tasks/${taskId}`);

        expect(response.statusCode).toBe(204);

    });


    test('should get task statistics', async () => {

        await request(app)
            .post('/tasks')
            .send({
                title: 'Todo Task',
                status: 'todo'
            });

        await request(app)
            .post('/tasks')
            .send({
                title: 'Done Task',
                status: 'done'
            });

        const response = await request(app)
            .get('/tasks/stats');

        expect(response.statusCode).toBe(200);
        expect(response.body.todo).toBe(1);
        expect(response.body.done).toBe(1);

    });

});