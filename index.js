const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'}))

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'employee',
    multipleStatements:true
    
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('Database Connection successful...');
    else
    console.log('Database connection failed '+ JSON.stringify(err))
});


app.listen(3000,()=>{
    console.log('express server is at port number 3000')
});

//get all employees
app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employeedb',(err,rows,fields)=>{
         if(!err)
       res.send(rows)
         else
         console.log(err);
        
    });

});

//get an employees

app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employeedb WHERE emp_id = ?',[req.params.id],(err,rows,fields)=>{
         if(!err)
       res.send(rows)
         else
         console.log(err);
        
    });

});


//delete an employees

app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM employeedb WHERE emp_id = ?',[req.params.id],(err,rows,fields)=>{
         if(!err)
       res.send('Deleted Success')
         else
         console.log(err);
        
    });

});

//insert an employees
app.post('/employees',(req,res)=>{
  let emp=req.body;
  var sql="INSERT INTO employeedb(emp_id,emp_name,emp_code,emp_salary) VALUES(?,?,?,?)"
  mysqlConnection.query(sql,[emp.emp_id,emp.emp_name,emp.emp_code,emp.emp_salary],(err,rows,fields)=>{
       if(!err)
     res.send('Insert Successfully')
       else
       console.log(err);
      
  });

});

//update an employee

app.put('/employees/:id',(req,res)=>{
  let emp=req.body;
  console.log(emp);
  var sql="UPDATE employeedb SET emp_name=?,emp_code=?,emp_salary=? WHERE emp_id=?"

  mysqlConnection.query(sql,[emp.emp_name,emp.emp_code,emp.emp_salary,req.params.id],(err,rows,fields)=>{
       if(!err)
     res.send('UPDATE Successfully....')
       else
       console.log(err);
      
  });

});



