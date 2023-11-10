const { query } = require('express');
const connectdatabase = require('../connectdata');
function customer() {
    this.getSearch = async function (req, res) {
        var result = { code: "000", msg: "", data: null }

        try {
            var sql = getsqlcmd(req)
            console.log(req)
            var jsondata = await connectdatabase.getdata(sql, true, false);
            // console.log("jsondata:",jsondata);

            if (jsondata.data != undefined) {
                result.data = jsondata.data;
                result.msg = jsondata.msg;
            } else {

                result.msg = "no customer data";
            }

        } catch (error) {

        }
        res.send(result);
    }
    this.getINSERT = async function (req, res) {
        var result = { code: "000", msg: "", data: null }
        var data = req.data;
        try {
            var sql = "INSERT INTO	customer(custid, custname,taxid,custemail,custphone, custaddress,contractname,contactmobile,remark,createid,createdate, modifiedid, modifieddate,pic)\n" +
                "SELECT MAX(custid)+1 ,'" + data.customername + "' as custname,'" + data.tex + "' as taxid ,'" + data.email + "' as custemail ,'" + data.phone + "' as custphone ,'" + data.address + "'\n" +
                " as custaddress ,'" + data.remark + "' as remark ,'" + data.contactname + "' as contractname ,'" + data.contactphone + "' as contactmobile , '" + req.uid.empid + "' as createid ,NOW()  ,\n " +
                " '" + req.uid.empid + "' as modifiedid ,NOW(),'" + req.pic + "' \n" +
                "FROM customer"
            var jsondata = await connectdatabase.getdata(sql, true);
              console.log("jsondata:", jsondata);

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
        if (req.tbname == "searchcustomers") {
            sqlcmd = "SELECT * FROM customer   WHERE (custname LIKE'%" + req.keyword + "%')  ORDER BY custname ASC;";

        }
        //ฟังชั่นเรียกข้อมูลช่อง department
        // else if (req.tbname == "getdepartment") {
        //     sqlcmd = "SELECT * FROM department";
        // }
        //ฟังชั่นเรียกข้อมูลช่อง position
        // else if (req.tbname == "getposition") {
        //     sqlcmd = "SELECT * FROM position";
        // }

        return sqlcmd;
    }

}
module.exports = new customer();