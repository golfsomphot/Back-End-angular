const connectdatabase = require('../connectdata');
function quotation() {

    this.getquotation = async function (req, res) {
        var result = { code: "000", msg: "", data: null }
        try {
            var sql = getsqlcmd(req);
            // console.log("sql:", sql);

            var jsondata = await connectdatabase.getdata(sql, true, false);

            if (jsondata.code == "000" && jsondata.data != undefined) {
                result.data = jsondata.data;
                result.msg = jsondata.msg;
            } else {
                result.code = "003";
                result.msg = "no quotation data";
            }
        } catch (error) {
            result.code = "001";
            result.msg = error;
        }
        res.send(result);
    }

    this.insertquotation = async function (req, res) {
        var result = { code: "000", msg: "", data: null };
        // console.log("req: ", req);
        try {
            var sql = insertsqlcmd(req);
            console.log("sql: ", sql);
            var jsondata = await connectdatabase.excdata(sql, true);
            console.log("jsondata: ", jsondata);
            if (jsondata.code == "000" && jsondata.data != undefined) {
                result.data = jsondata.data;
                result.msg = jsondata.msg;
            } else {
                result.code = "006";
                result.msg = "เพิ่มข้อมูลไม่ได้";
            }

        } catch (ex) {
            result.code = "001";
            result.msg = ex;
        }
        res.send(result);
    }

    function getsqlcmd(req) {
        if (req.tbname == "getquotation") {
            var sqlcmd = "SELECT * FROM quotation WHERE (quocode LIKE '%" + req.keyword + "%') ";
        } else if (req.tbname == "getproduct") {
            var sqlcmd = "SELECT * FROM product  ";
        } else if (req.tbname == "getquodetail") {
            var sqlcmd = "SELECT * FROM quodetail  ";
        } else if (req.tbname == "getcustomer") {
            var sqlcmd = "SELECT custid, custname, custaddress FROM customer";
        } else if (req.tbname == "getemployee") {
            var sqlcmd = "SELECT empid, empcode, fullname FROM employee";
        }
        return sqlcmd;
    }

    function insertsqlcmd(req) {
        if (req.tbname == "insertquotation") {
            var data = req.data;
            var sqlcmd = "INSERT INTO quotation (quocode, billtoname, billtoaddress, paymentterms, createid, createdate, modifiedid, modifieddate) \n" +
                "VALUES ('789','" + data.bill + "','" + data.billaddress + "','" + data.paymentterm + "', \n" +
                "'" + req.uid + "', now(),'" + req.uid + "', now()) \n" +
                "ON DUPLICATE KEY UPDATE quocode = '789+1', billtoname = '" + data.bill + "' ";
        } else if (req.tbname == "insertitemproduct") {
            var data = req.data;
            var sqlcmd = "INSERT INTO quodetail (quocode,item, productcode, unitprice, amount) \n" +
                "VALUES ('10'+1,'1','" + req.code + "','" + data.itemprice + "','" + data.totalvalue + "')";
        }
        return sqlcmd;
    }
}
module.exports = new quotation();