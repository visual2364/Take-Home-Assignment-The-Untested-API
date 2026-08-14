# Submission Notes

## What I Would Test Next

If I had more time, I would add more validation and error-handling tests.

I would test invalid task status, invalid priority, invalid due dates, empty titles, and pagination edge cases.

I would also test API behavior when a task does not exist.

## What Surprised Me

The application uses an in-memory array instead of a database.

I also found that some API functionality was missing even though related service functions were available.

The pagination bug was interesting because the function did not return the correct tasks for the first page.

## Questions Before Shipping to Production

Before shipping this API to production, I would ask:

1. Which database should be used instead of the in-memory store?
2. What authentication and authorization should be used?
3. Should a task belong to a specific user?
4. What are the exact validation rules for task fields?
5. Should an already assigned task be allowed to be reassigned?
6. What logging and monitoring should be added?