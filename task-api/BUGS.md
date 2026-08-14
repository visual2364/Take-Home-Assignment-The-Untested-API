# Bug Report

## Bug 1: Pagination Bug

### Location
src/services/taskService.js

### Problem
The pagination function does not return the correct tasks for the first page.

### Expected Behavior
When requesting page 1 with a limit of 2, the API should return Task 1 and Task 2.

### Actual Behavior
Only 1 task was returned.

### How I Found It
I wrote a Jest test for the first page of pagination. The test failed with:

Expected: 2
Received: 1

### Suggested Fix
Change:

const offset = page * limit;

to:

const offset = (page - 1) * limit;



## Bug 2: Get Task by ID endpoint is missing

### Location
src/routes/tasks.js

### Problem
The API does not provide a GET /tasks/:id route to retrieve a single task by its ID.

### Expected Behavior
A request to GET /tasks/:id should return the requested task when the task exists.

### Actual Behavior
The request returns HTTP 404 because the route is not implemented.

### How I Found It
I wrote an integration test using Supertest:

GET /tasks/:id

The test failed with:

Expected: 200
Received: 404

### Suggested Fix
Add a GET /:id route that finds the task using taskService.findById(id) and returns HTTP 404 when the task does not exist.