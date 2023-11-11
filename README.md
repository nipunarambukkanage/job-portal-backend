**********README**********

API Calls List

User Authentication API:

User Registration

Request:
http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "jobTitle": "Software Engineer",
  "organization": "Tech Co",
  "country": "USA",
  "function": "Development",
  "email": "john@example.com",
  "password": "securePassword"
}


Response:
json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "jobTitle": "Software Engineer",
    "organization": "Tech Co",
    "country": "USA",
    "function": "Development",
    "email": "john@example.com",
    "role": "user"
  }
}


User Login

Request:
http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword"
}


Response:
json
{
  "message": "Login successful",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "jobTitle": "Software Engineer",
    "organization": "Tech Co",
    "country": "USA",
    "function": "Development",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jsonwebtoken"
}


Admin Login

Request:
http
POST /api/auth/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "adminPassword"
}


Response:

{
  "message": "Admin login successful",
  "admin": {
    "_id": "admin_id",
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@example.com",
    "role": "admin"
  },
  "token": "jsonwebtoken"
}

Categories API:

Get All Job Categories

Request:
http
GET /api/categories


Response:
json
{
  "categories": [
    {
      "_id": "category_id_1",
      "name": "IT"
    },
    {
      "_id": "category_id_2",
      "name": "Marketing"
    }
    // ... other categories
  ]
}


Get a Specific Job Category by ID

Request:
http
GET /api/categories/category_id_1


Response:
json
{
  "category": {
    "_id": "category_id_1",
    "name": "IT"
  }
}


Create a New Job Category (Admin Only)

Request:
http
POST /api/categories
Content-Type: application/json
Authorization: Bearer admin_token

{
  "name": "Sales"
}


Response:
json
{
  "message": "Category created successfully",
  "category": {
    "_id": "new_category_id",
    "name": "Sales"
  }
}


Update a Job Category by ID (Admin Only)

Request:
http
PUT /api/categories/category_id_1
Content-Type: application/json
Authorization: Bearer admin_token

{
  "name": "Information Technology"
}


Response:
json
{
  "message": "Category updated successfully",
  "category": {
    "_id": "category_id_1",
    "name": "Information Technology"
  }
}


Delete a Job Category by ID (Admin Only)

Request:
http
DELETE /api/categories/category_id_2
Authorization: Bearer admin_token


Response:
json
{
  "message": "Category deleted successfully",
  "category": {
    "_id": "category_id_2",
    "name": "Marketing"
  }
}

Job API:

Get All Jobs

Request:
http
GET /api/jobs


Response:
json
{
  "jobs": [
    {
      "_id": "job_id_1",
      "title": "Software Engineer",
      "company": "Tech Co",
      "location": "City A",
      "description": "Exciting software engineering position",
      "requirements": "Bachelor's degree in Computer Science",
      "category": {
        "_id": "category_id_1",
        "name": "IT"
      }
    },
    {
      "_id": "job_id_2",
      "title": "Marketing Specialist",
      "company": "Marketing Agency",
      "location": "City B",
      "description": "Creative marketing role",
      "requirements": "Experience in digital marketing",
      "category": {
        "_id": "category_id_2",
        "name": "Marketing"
      }
    }
    // ... other jobs
  ]
}


Get a Specific Job by ID

Request:
http
GET /api/jobs/job_id_1


Response:
json
{
  "job": {
    "_id": "job_id_1",
    "title": "Software Engineer",
    "company": "Tech Co",
    "location": "City A",
    "description": "Exciting software engineering position",
    "requirements": "Bachelor's degree in Computer Science",
    "category": {
      "_id": "category_id_1",
      "name": "IT"
    }
  }
}


Create a New Job (Admin Only)

Request:
http
POST /api/jobs
Content-Type: application/json
Authorization: Bearer admin_token

{
  "title": "Data Scientist",
  "company": "Data Co",
  "location": "City C",
  "description": "Analyzing and interpreting complex data sets",
  "requirements": "Master's degree in Data Science",
  "category": "category_id_1"
}


Response:
json
{
  "message": "Job created successfully",
  "job": {
    "_id": "new_job_id",
    "title": "Data Scientist",
    "company": "Data Co",
    "location": "City C",
    "description": "Analyzing and interpreting complex data sets",
    "requirements": "Master's degree in Data Science",
    "category": {
      "_id": "category_id_1",
      "name": "IT"
    }
  }
}


Update a Job by ID (Admin Only)

Request:
http
PUT /api/jobs/job_id_1
Content-Type: application/json
Authorization: Bearer admin_token

{
  "title": "Senior Software Engineer",
  "company": "Tech Co",
  "location": "City A",
  "description": "Exciting software engineering position with leadership responsibilities",
  "requirements": "Master's degree in Computer Science",
  "category": "category_id_1"
}


Response:
json
{
  "message": "Job updated successfully",
  "job": {
    "_id": "job_id_1",
    "title": "Senior Software Engineer",
    "company": "Tech Co",
    "location": "City A",
    "description": "Exciting software engineering position with leadership responsibilities",
    "requirements": "Master's degree in Computer Science",
    "category": {
      "_id": "category_id_1",
      "name": "IT"
    }
  }
}


Delete a Job by ID (Admin Only)

Request:
http
DELETE /api/jobs/job_id_2
Authorization: Bearer admin_token


Response:
json
{
  "message": "Job deleted successfully",
  "job": {
    "_id": "job_id_2",
    "title": "Marketing Specialist",
    "company": "Marketing Agency",
    "location": "City B",
    "description": "Creative marketing role",
    "requirements": "Experience in digital marketing",
    "category": {
      "_id": "category_id_2",
      "name": "Marketing"
    }
  }
}

User API:

Get All Users (Admin Only)

Request:
http
GET /api/users
Authorization: Bearer admin_token


Response:
json
{
  "users": [
    {
      "_id": "user_id_1",
      "firstName": "John",
      "lastName": "Doe",
      "jobTitle": "Software Engineer",
      "organization": "Tech Co",
      "country": "USA",
      "function": "Development",
      "email": "john@example.com",
      "role": "user"
    },
    {
      "_id": "user_id_2",
      "firstName": "Jane",
      "lastName": "Smith",
      "jobTitle": "Marketing Specialist",
      "organization": "Marketing Agency",
      "country": "Canada",
      "function": "Marketing",
      "email": "jane@example.com",
      "role": "admin"
    }
    // ... other users
  ]
}


Get a Specific User by ID (Admin Only)

Request:
http
GET /api/users/user_id_1
Authorization: Bearer admin_token


Response:
json
{
  "user": {
    "_id": "user_id_1",
    "firstName": "John",
    "lastName": "Doe",
    "jobTitle": "Software Engineer",
    "organization": "Tech Co",
    "country": "USA",
    "function": "Development",
    "email": "john@example.com",
    "role": "user"
  }
}


Update a User by ID (Admin Only)

Request:
http
PUT /api/users/user_id_1
Content-Type: application/json
Authorization: Bearer admin_token

{
  "jobTitle": "Senior Software Engineer",
  "country": "Canada",
  "function": "Lead Developer"
}


Response:
json
{
  "message": "User updated successfully",
  "user": {
    "_id": "user_id_1",
    "firstName": "John",
    "lastName": "Doe",
    "jobTitle": "Senior Software Engineer",
    "organization": "Tech Co",
    "country": "Canada",
    "function": "Lead Developer",
    "email": "john@example.com",
    "role": "user"
  }
}


Delete a User by ID (Admin Only)

Request:
http
DELETE /api/users/user_id_2
Authorization: Bearer admin_token


Response:
json
{
  "message": "User deleted successfully",
  "user": {
    "_id": "user_id_2",
    "firstName": "Jane",
    "lastName": "Smith",
    "jobTitle": "Marketing Specialist",
    "organization": "Marketing Agency",
    "country": "Canada",
    "function": "Marketing",
    "email": "jane@example.com",
    "role": "admin"
  }
}

