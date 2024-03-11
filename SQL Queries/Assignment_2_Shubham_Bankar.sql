 CREATE DATABASE assign_2_Shubham_Bankar;


--ALTER DATABASE assign_2_Shubham_Bankar SET MULTI_USER;
 
 USE assign_2_Shubham_Bankar;

 CREATE TABLE Employees(
 EmployeeID INT PRIMARY KEY IDENTITY(1,1),
 LastName VARCHAR(30),
 FirstName VARCHAR(30),
 Title VARCHAR(50),
 BirthDate DATE,
 HireDate DATE,
 ReportsTo INT,
 Address VARCHAR(100),
 );



CREATE TABLE Customers(
CustomerID INT PRIMARY KEY IDENTITY(1,1),
CompanyName VARCHAR(50),
ContactName VARCHAR(50),
ContactTitle VARCHAR(50),
Address VARCHAR(100),
City VARCHAR(30),
Country VARCHAR(50),
)


CREATE TABLE Orders(
OrderID INT PRIMARY KEY IDENTITY(1,1),
CustomerID INT FOREIGN KEY REFERENCES Customers(CustomerID),
EmployeeID INT FOREIGN KEY REFERENCES Employees(EmployeeID),
OrderDate DATE
)

INSERT INTO Employees VALUES
('Bankar','Shubham','Manager','2002-12-30','2010-01-01',NULL,'Pune, Maharashtra'),
('Jadhav','Prajwal','Team Lead','2002-06-06','2012-07-01',1,'Patas,Pune'),
('Gupta','Akash','Salesman','2004-05-01','2016-01-01',2,'Malegaon Baramati'),
('Kumar','Akshay','Salesman','2000-01-01','2018-01-05',2,'Mumbai Maharashtra'),
('Swift','Taylor','Salesman','1998-12-30','2020-09-11',1,'California USA');

INSERT INTO Customers VALUES
('Shaligram_Infotech','Chirag','Trainee','Ahmedabad Gujarat','Gujarat','India'),
('OpenAI','Sam','CEO','San Francisco,California','San Francisco','USA'),
('Meta','Mark','CTO','Menlo Park,California','California','USA'),
('Stark_Industries','TONY','CEO','New York','New York','USA'),
('Wargaming','Jeff','Manager','Nicosia','Nicosia','Cyprus'),
('Lenskart','Piyush','Sales Head','Mumbai,Maharashtra','Mumbai','India');

INSERT INTO Orders (CustomerID, EmployeeID, OrderDate) VALUES
(1, 3, '2023-08-05'),
(2, 1, '2023-08-05'),
(5, 2, '2023-08-05'),
(4, 4, '2023-08-05'),
(6, 5, '2024-10-12');

SELECT * FROM Customers
SELECT * FROM Orders
SELECT * FROM Employees


/*1).Write a SQL query to retrieve the list of all orders made by customers in the "USA".*/

SELECT Orders.OrderID,Customers.CustomerID,Customers.Country 
FROM Orders INNER JOIN Customers  
ON
Customers.CustomerID=Orders.CustomerID
WHERE Country='USA'
;

/*2).Write a SQL query to retrieve the list of all customers who have placed an order.*/

SELECT o.CustomerID , o.OrderID, c.ContactName
FROM Orders AS o INNER JOIN Customers AS c
ON 
o.CustomerID=c.CustomerID
WHERE o.OrderID IS NOT NULL;

/*3).Write a SQL query to retrieve the list of all employees who have not yet placed an order.*/

SELECT * FROM Employees
SELECT * FROM Orders

SELECT e.EmployeeID, e.FirstName+' '+e.LastName AS emp_name,o.OrderID
FROM Employees AS e LEFT JOIN Orders AS o
ON
e.EmployeeID=o.CustomerID
WHERE o.OrderID IS NULL;

/*4).Write a SQL query to retrieve the list of all employees who have placed an order.*/
SELECT * FROM Employees
SELECT * FROM Orders

SELECT e.EmployeeID, e.LastName,e.FirstName,o.OrderID
FROM Employees AS e LEFT JOIN Orders AS o
ON
e.EmployeeID=o.CustomerID
WHERE o.OrderID IS NOT NULL;

/*5).Write a SQL query to retrieve the list of all customers who have not yet placed an order.*/

SELECT * FROM Customers;
SELECT * FROM Orders;

SELECT c.CustomerID,c.ContactName,c.Country,o.OrderID
From Customers AS c LEFT JOIN Orders AS o
ON
c.CustomerID=o.CustomerID
WHERE o.orderID IS NULL;

/*6).Write a SQL query to retrieve the list of all customers who have placed an order, along with the order date.*/

SELECT c.CustomerID,c.ContactName,o.OrderID,o.OrderDate
From Customers AS c LEFT JOIN Orders AS o
ON
c.CustomerID=o.CustomerID
WHERE o.orderID IS NOT NULL;

/*7)Write a SQL query to retrieve the list of all orders placed by a particular customer.*/
SELECT * FROM Customers;
SELECT * FROM Orders;


SELECT c.CustomerID,c.ContactName,o.OrderID
FROM Customers AS c INNER JOIN Orders AS o
ON
c.CustomerID=o.CustomerID
WHERE c.CustomerID=2;  --particualr customer


/*8)Write a SQL query to retrieve the list of all orders placed by a particular employee.*/

SELECT * FROM Employees;
SELECT * FROM Orders;

SELECT e.EmployeeID,e.FirstName,e.LastName,o.orderID
FROM Employees AS e INNER JOIN Orders AS o
ON
e.EmployeeID=o.EmployeeID
Where e.EmployeeID=3;

/*9)Write a SQL query to retrieve the list of all orders placed by a particular customer on a particular date.*/

SELECT * FROM Customers;
SELECT * FROM Orders;

SELECT c.CustomerID, c.ContactName, o.OrderId, o.OrderDate
FROM Customers AS c INNER JOIN Orders o
ON
c.CustomerID= o.CustomerID
WHERE c.CustomerID=3 AND o.OrderDate='2023-08-05';  --particular date ad customer

/*10)Write a SQL query to retrieve the list of all customers who have not yet placed an order, sorted by their country.*/

SELECT * FROM Customers;

SELECT * FROM Orders;

SELECT c.CustomerID,c.ContactName,c.Country,o.OrderID
From Customers AS c LEFT JOIN Orders AS o
ON
c.CustomerID=o.CustomerID
WHERE o.orderID IS NULL
ORDER BY  c.Country;

/*11)Write a SQL query to retrieve the list of all orders placed by customers in the "USA", sorted by order date.*/

SELECT * FROM Customers;
SELECT * FROM Orders;

SELECT c.CustomerID, c.ContactName ,c.Country, o.OrderID, o.OrderDate
FROM Customers AS c INNER JOIN Orders As o
ON
c.CustomerID=o.CustomerID
WHERE c.Country='USA'
ORDER BY o.OrderDate;

/*12)Write a SQL query to retrieve the list of all employees who have not yet placed an order, sorted by last name.*/

SELECT * FROM Employees;
SELECT * FROM Orders;

SELECT e.EmployeeID,e.FirstName,e.LastName,o.OrderID 
FROM Employees AS e LEFT JOIN Orders AS o
ON
e.EmployeeID=o.EmployeeID
WHERE o.OrderID IS NULL
ORDER BY e.LastName;

/*13)Write a SQL query to retrieve the list of all customers who have placed an order, sorted by their company name.*/

SELECT * FROM Customers;
SELECT * FROM Orders;

SELECT c.CustomerID,c.ContactName,o.OrderID,c.CompanyName
FROM Customers AS c LEFT JOIN Orders AS o
ON 
c.CustomerID=o.CustomerID
WHERE o.OrderID IS NOT NULL
ORDER BY c.CompanyName;

/*14)Write a SQL query to retrieve the list of all employees who have placed an order, sorted by their hire date.*/


SELECT * FROM Employees;
SELECT * FROM Orders;

SELECT e.EmployeeID , e.FirstName, e.LastName ,e.HireDate, o.OrderID
FROM Employees AS e LEFT JOIN Orders AS o
ON 
e.EmployeeID=o.EmployeeID
WHERE o.OrderID IS NOT NULL
ORDER BY e.HireDate;

/*15)Write a SQL query to retrieve the list of all customers who have placed an order on a particular date,
sorted by their company name.*/

SELECT * FROM Customers;
SELECT * FROM Orders;

SELECT c.CustomerID, c.ContactName,c.CompanyName, o.OrderID, o.OrderDate
FROM Customers AS c INNER JOIN Orders As o
ON 
c.CustomerID=o.CustomerID
WHERE OrderDate='2023-08-05'  --specific date
ORDER BY c.CompanyName
;

/*
16)Write a SQL query to retrieve the list of all customers who have placed an order, 
along with the employee who handled the order.*/

SELECT * FROM Customers;
SELECT * FROM Orders;

SELECT c.CustomerID, o.OrderID ,o.EmployeeID
FROM Customers As c INNER JOIN Orders AS o
ON
c.CustomerID=o.CustomerID;

/*17)Write a SQL query to retrieve the list of all employees who have placed an order, 
along with the customer who placed the order.*/

SELECT * FROM Employees;
SELECT * FROM Orders;

SELECT e.EmployeeID , o.OrderID, o.CustomerID
FROM Employees AS e INNER JOIN Orders AS o
ON
e.EmployeeID=o.EmployeeID;

/*18)Write a SQL query to retrieve the list of all orders placed by customers in a particular country, 
along with the customer name and order date.*/

SELECT * FROM Customers;
SELECT * FROM Orders;

SELECT o.OrderID,o.CustomerID,c.Country, c.ContactName AS customer_name ,o.OrderDate
FROM Customers AS c INNER JOIN Orders AS o
ON
c.CustomerID=o.CustomerID
WHERE c.Country='USA'; --specific countruy

/*19)Write a SQL query to retrieve the list of all orders placed by employees who were born in a particular year, 
along with the employee name and order date.*/


SELECT * FROM Employees;
SELECT * FROM Orders;

SELECT o.OrderID,e.EmployeeID,e.FirstName,e.LastName,e.BirthDate,o.OrderDate
FROM Employees As e INNER JOIN ORders as o
ON 
e.EmployeeID=o.EmployeeID
WHERE YEAR(e.BirthDate)=2002;  --specific here 

/*20)Write a SQL query to retrieve the list of all customers who have placed an order, along with the customer name, 
order date, and employee who handled the order.*/

SELECT * FROM Customers;
SELECT * FROM ORders;

SELECT c.CustomerID,c.ContactName,o.OrderDate,o.EmployeeID
FROM Customers AS c INNER JOIN Orders AS o
ON
c.CustomerID=o.CustomerID;

/*
21)Write a SQL query to retrieve the list of all orders placed by customers who have a particular contact title,
along with the customer name and order date.*/

SELECT * FROM Customers;
SELECT * FROM Orders;


SELECT o.OrderID,c.CustomerID , c.ContactTitle, c.ContactName AS [Customer Name], o.OrderDate
FROM Customers AS c INNER JOIN Orders AS o
ON
c.CustomerID=o.CustomerID
WHERE c.ContactTitle='CEO'; --particular title

/*22).Write a SQL query to retrieve the list of all orders placed by employees who have a particular job title, 
along with the employee name and order date.*/

SELECT * FROM Employees;
SELECT * FROM Orders;

SELECT o.OrderID,e.title,e.EmployeeID,e.FirstName,e.LastName,o.OrderDate
FROM Employees AS e INNER JOIN Orders AS o
ON 
e.EmployeeID=o.EmployeeID
WHERE e.Title='Salesman'; --partiular job title


/*23)Write a SQL query to retrieve the list of all customers who have placed an order on a particular date, 
along with the customer name, order date, and employee who handled the order.*/

SELECT * FROM Customers;
SELECT * FROM Orders;

SELECT c.CustomerID,o.OrderDate,c.ContactName AS Customer_Name ,o.EmployeeID
FROM Customers AS c INNER JOIN Orders AS o
ON
c.CustomerID=o.CustomerID
WHERE o.OrderDate='2024-10-12';-- particular date

/*24)Write a SQL query to retrieve the list of all orders placed by customers in a particular city, 
along with the customer name and order date.*/


SELECT * FROM Customers;
SELECT * FROM Orders;

SELECT o.OrderID,c.CustomerID,c.City,c.ContactName As Customer_name 
FRom Customers AS c INNER JOIN Orders As o
ON
c.CustomerID=o.CustomerID
WHERE c.City='California';

/*25)Write a SQL query to retrieve the list of all orders placed by employees who were born in a particular city, 
along with the employee name and order date.*/

SELECT * FROM Employees;
SELECT * FROM Orders;

SELECT o.OrderID, e.FirstName,e.LastName, e.Address AS birth_city
FROM Employees As e INNER JOIN Orders As o
ON
e.EmployeeID=o.EmployeeID
Where e.Address LIKE 'Pune%';

/*26)Write a SQL query to retrieve the list of all customers who have placed an order, 
along with the customer name, order date, and employee who handled the order, sorted by order date.*/

SELECT * FROM Customers;
SELECT * FROM Orders;

SELECT c.CustomerID,o.OrderID,c.ContactName AS customer_name, o.OrderDate,o.EmployeeID
FROM Customers As c INNER JOIN Orders AS o
ON
c.CustomerID =o.CustomerID
ORDER BY o.OrderDate;

/*27)Write a SQL query to retrieve the list of all orders placed by customers in a particular country,
along with the customer name and order date, sorted by order date.*/

SELECT * FROM Customers;
SELECT * FROM Orders;

SELECT o.OrderID,c.CustomerID,c.Country,c.ContactName As customer_name , o.OrderDate
FROM Customers As c INNER JOIN Orders as o
ON
c.CustomerID=o.OrderID
WHERE Country='USA' --particular country
ORDER BY o.OrderDate; --sorted by date



