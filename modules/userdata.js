// const { query } = require('express');
const connectdatabase = require('../connectdata');
var md5 = require('md5');
const bcrypt = require('bcryptjs');
function userdata() {
    this.getlogin = async function (req, res) {
        // console.log("reqgetlogin:", req);
        var data = req.data;
        var result = { code: "000", msg: "", data: null }
        try {
            var sql = "SELECT empid,empcode,email,phone,pwd,address,fullname,nickname,pic  FROM employee  WHERE (email = '" + data.user + "');"
            var jsondata = await connectdatabase.getdata(sql, true, true);
            // console.log("jsondata:", jsondata)
            if (jsondata.data != undefined && req.tbname == "getdatalogin") {
                //   if (jsondata.data.pwd == md5(req.pwd).toUpperCase())
                if (jsondata.data.pwd == md5(data.password).toUpperCase()) {
                    delete jsondata.data.pwd;
                    result.data = jsondata.data;
                    result.msg = jsondata.msg;
                } else {
                    result.code = "001";
                    result.msg = "password ไม่ถูกต้อง";
                }
            } else {
                result.code = "005";
                result.msg = "Userไม่ถูกต้อง";

            }

        } catch (error) {
            result.code = "003";
            result.msg = error;
            console.log("error ", error)
        }

        res.send(result);
    }

    this.getSearch = async function (req, res) {
        var result = { code: "000", msg: "", data: null }

        try {
            var sql = "SELECT email FROM employee WHERE (email LIKE'%" + req.keyword + "%')";

            // console.log("sql",sql);

            var jsondata = await connectdatabase.getdata(sql, true, false);
            // console.log("jsondata:",jsondata);

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

}
module.exports = new userdata();