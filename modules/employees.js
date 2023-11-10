
const connectdatabase = require('../connectdata');
const md5 = require('md5');
function employees() {

    this.getSearch = async function (req, res) {
        var result = { code: "000", msg: "", data: null }
        // console.log("req: ", req)
        try {
            var sql = getsqlcmd(req)
            var jsondata = await connectdatabase.getdata(sql, true, false);
            if (jsondata.data != undefined) {
                result.data = jsondata.data;
                result.msg = jsondata.msg;
            } else {

                result.msg = "no employees data";
            }

        } catch (error) {

        }
        res.send(result);
    }
    this.getINSERT = async function (req, res) {
        var result = { code: "000", msg: "", data: null }
        var data = req.data;
        console.log("req:", req);
        //แปลง md5 
        //  md5(req.data.confirmPassword)
        //  const inputData = md5(req.data.confirmPassword);
        //  const uppercaseData = inputData.toUpperCase();
        //  console.log("uppercaseData :", uppercaseData);
        try {
            if (req.tbname = "searchcustomer") {
                var sql = "INSERT INTO employee(fullname,nickname,email,phone,department,position,address,createid,createdate,modifieddate,pic )\n" +
                    "VALUES ( '" + data.fullname + "','" + data.nickname + "','" + data.email + "','" + data.phone + "' ,\n" +
                    "'" + data.department + "','" + data.position + "', '" + data.address + "','" + req.uid.empid + "',NOW(),NOW(),'" + req.pic + "' );"
                var jsondata = await connectdatabase.getdata(sql, true);
                console.log("jsondata:", jsondata)
                console.log("sql:", sql)

            }
            if (jsondata.code == "000" && jsondata.data != undefined) {
                result.data = jsondata.data;
                result.msg = jsondata.msg;

            } else {
                result.code = "002";
                result.msg = "ไม่สามารถเพิ่มข้อมูลได้";
            }

        } catch (error) {

        }
        res.send(result);
    }
    function getsqlcmd(req) {
        var sqlcmd = "";
        console.log("req:", req);
        if (req.tbname == "searchemployees") {
            sqlcmd = "SELECT * FROM employee WHERE email LIKE'%" + req.keyword + "%' OR fullname LIKE'%" + req.keyword + "%' ORDER BY fullname ASC ";

        }
        //ฟังชั่นเรียกข้อมูลช่อง department
        else if (req.tbname == "getdepartment") {
            sqlcmd = "SELECT * FROM department";
        }
        //ฟังชั่นเรียกข้อมูลช่อง position
        else if (req.tbname == "getposition") {
            sqlcmd = "SELECT * FROM position";
        }

        return sqlcmd;
    }
}

module.exports = new employees();