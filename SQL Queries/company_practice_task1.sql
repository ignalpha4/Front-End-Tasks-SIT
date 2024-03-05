create database Company;

use Company;

create table Employees(
EmployeeID INT Primary Key IDENTITY(1,1),
FirstName VARCHAR(50),
LastName VARCHAR(50),
Position VARCHAR(50),
Salary DECIMAL(10,2),
);


INSERT INTO Employees VALUES('Shubham','Bankar','Software-Developer-Trainee',5000,'2022-12-30');
INSERT INTO Employees VALUES('Prajwal','Jadhav','Tester-Trainee',43500);
INSERT INTO Employees VALUES('Pratik','Dhaygude','Software-Developer',15000);

SELECT * FROM Employees;

UPDATE  Employees Set Salary=Salary*1.1 Where EmployeeID=1;

DELETE FROM Employees Where EmployeeID=(SELECT min(EmployeeID) FROM Employees);

ALTER TABLE Employees ADD HireDate Date;

UPDATE Employees Set HireDate='2024-01-07' Where EmployeeID=2;

UPDATE Employees Set HireDate='2024-03-18' Where EmployeeID=3;

/*Finding the employees hired in last six months*/

SELECT * FROM Employees Where HireDate>'2023-09-01';

