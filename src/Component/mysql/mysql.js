import mysql from "mysql";
const connection=mysql.createConnection({
    host:"fopuxa8s.2318.dnstoo.com:5509",
    user:"danzhu0909_f",
    password:"danzhu0909",
    database:"danzhu0909",
})
class Mysql{
    query(string,database){
        connection.connect()
        connection.query(string, function (error, results, fields) {
            if (error) throw error;
            console.log(results);
          });
        connection.end();
    }
}
export default Mysql;