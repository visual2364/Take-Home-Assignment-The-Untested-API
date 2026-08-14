const taskService = require('../src/services/taskService');

describe('Task Service', () => {

    beforeEach(() => {
        taskService._reset();
    });

    test('should create a new task', () => {

        const task = taskService.create({
            title: 'Learn Testing'
        });

        expect(task.title).toBe('Learn Testing');
        expect(task.status).toBe('todo');
        expect(task.priority).toBe('medium');
    });

    test('should get all tasks', () => {

    taskService.create({
        title: 'Task 1'
    });

    taskService.create({
        title: 'Task 2'
    });

    const tasks = taskService.getAll();

    expect(tasks.length).toBe(2);
    expect(tasks[0].title).toBe('Task 1');
    expect(tasks[1].title).toBe('Task 2');

});

test('should find a task by id', () => {

    const task = taskService.create({
        title: 'Find Me'
    });

    const foundTask = taskService.findById(task.id);

    expect(foundTask).not.toBeUndefined();
    expect(foundTask.title).toBe('Find Me');
    expect(foundTask.id).toBe(task.id);

});

test('should get tasks by status', () => {

    taskService.create({
        title: 'Task 1',
        status: 'todo'
    });

    taskService.create({
        title: 'Task 2',
        status: 'done'
    });

    const tasks = taskService.getByStatus('todo');

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Task 1');

});

test('should return first page of tasks', () => {

    taskService.create({ title: 'Task 1' });
    taskService.create({ title: 'Task 2' });
    taskService.create({ title: 'Task 3' });

    const tasks = taskService.getPaginated(1, 2);

    expect(tasks.length).toBe(2);
    expect(tasks[0].title).toBe('Task 1');
    expect(tasks[1].title).toBe('Task 2');

});
test('should update a task', () => {

    const task = taskService.create({
        title: 'Old Title'
    });

    const updatedTask = taskService.update(task.id, {
        title: 'New Title',
        priority: 'high'
    });

    expect(updatedTask.title).toBe('New Title');
    expect(updatedTask.priority).toBe('high');
    expect(updatedTask.id).toBe(task.id);

});
test('should remove a task', () => {

    const task = taskService.create({
        title: 'Delete Me'
    });

    const result = taskService.remove(task.id);

    expect(result).toBe(true);
    expect(taskService.findById(task.id)).toBeUndefined();

});

test('should complete a task', () => {

    const task = taskService.create({
        title: 'Complete Me',
        priority: 'high'
    });

    const completedTask = taskService.completeTask(task.id);

    expect(completedTask.status).toBe('done');
    expect(completedTask.completedAt).not.toBeNull();

});

test('should return task statistics', () => {

    taskService.create({
        title: 'Todo Task',
        status: 'todo'
    });

    taskService.create({
        title: 'Progress Task',
        status: 'in_progress'
    });

    taskService.create({
        title: 'Done Task',
        status: 'done'
    });

    const stats = taskService.getStats();

    expect(stats.todo).toBe(1);
    expect(stats.in_progress).toBe(1);
    expect(stats.done).toBe(1);
    expect(stats.overdue).toBe(0);

});

});