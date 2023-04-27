# Go Train Schedule API
The GO Train Schedule API is a NodeJS service that provides a simplified train timetable with weekday train times leaving Union Station. 

### Tasklist:
- [x] Design **GET /schedule** endpoint to return the entire timetable as a JSON array.

- [x] Design **GET /schedule/{line}** endpoint to return a JSON array with the timetable for a specific line:
  - [x] Return HTTP 404 (Not Found), if line does not exist.
  
- [x] Design **GET /schedule/{line}?departure={time}** endpoint to return a one-element JSON array with the record for the specified train line and departure time: 
  - [x] Accept departure time in both 24-hour (military: Eg.-> 1215) and 12-hour (Eg.-> 12:15pm) formats.
  - [x] Return HTTP 200 (Success) with an empty array, if line does not have a train for the given departure time.
  - [x] Return HTTP 404 (Not Found), if line does not exist.
  - [x] Return HTTP 400 (Bad Request), if departure time is not in a valid format.
  
### Bonus Tasklist:
- [x] Add documentation.
- [x] Add unit and integration tests to the features requested above.
- [ ] Enable caching for the requests in a way where the timetable data repository is not queried twice for a repeat request.

### Test Results (Mocha and Chai):

![testCases](https://user-images.githubusercontent.com/32465357/234899244-0c1b6885-f655-4a27-a613-3260289c6c54.png)

### Code Coverage (nyc - Istanbul):

![codeCoverage](https://user-images.githubusercontent.com/32465357/234899686-8f4767c8-5966-4e2e-86f6-7b729edb07df.png)

### Deployed API (Microsoft Azure - App Services):

[https://go-train-schedule-api.azurewebsites.net/](https://go-train-schedule-api.azurewebsites.net/schedule)

### API Documentation (Swagger):

[https://go-train-schedule-api.azurewebsites.net/api-docs/](https://go-train-schedule-api.azurewebsites.net/api-docs/)

### Learning Outcomes:
- Learnt to test (unit and integration) the backend using mocha and chai.
- Learnt to document the API using Swagger.

### Future Enhancements:
- Store data into MongoDB database.
- Populate more endpoints, to insert, update and delete data in the train schedule.
- Enable Caching for reducing response time.


