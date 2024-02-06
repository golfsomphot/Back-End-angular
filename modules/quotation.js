const connectdatabase = require('../connectdata');
function quotation() {

    this.getquotation = async function (req, res) {
        var result = { code: "000", msg: "", data: null }
        try {
            var sql = getsqlcmd(req);
            // console.log("sql",sql);
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
        try {
            var sql = insertsqlcmd(req);

            var jsondata = await connectdatabase.excdata(sql, true);
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

    function insertsqlcmd(req) {
        console.log("insertsqlcmd req", req)
        if (req.tbname == "insertquotation") {
            var data = req.data;
            // console.log("insertsqlcmd data",data);
            var sqlcmd = "INSERT INTO quotation (quocode,saleid,custid,billtoname,billtoaddress,paymentterms,totalline,amount,discount,vat,total,reqdate,remark,createid,createdate,modifiedid,modifieddate)\n" +
                "VALUES ('" + data.quocode + "','" + data.saleid + "','" + data.custid + "','" + data.billtoname + "',\n" +
                "'" + data.billtoaddress + "','" + data.paymentterms + "','" + data.totalline + "','" + data.amount + "',\n" +
                "'" + data.discount + "','" + data.vat + "','" + data.total + "','" + data.reqdate + "','" + data.remark + "',\n" +
                "'" + req.uid + "', now(),'" + req.uid + "', now())";

        } else if (req.tbname == "insertquodetail") {
            var data = req.data;
            // console.log("insertquodetail data",data);
            var sqlcmd = "INSERT INTO quodetail (quocode,item, productcode,qty, unitprice, amount, discount, vat, total, remark,createid, createdate, modifiedid, modifieddate)  \n" +
                "VALUES ('" + data.quocode + "','" + data.item + "','" + data.productcode + "','" + data.qty + "' \n" +
                ",'" + data.unitprice + "','" + data.amount + "','" + data.discount + "','" + data.vat + "', \n" +
                "'" + data.total + "','" + data.remark + "','" + req.uid + "', now(), '" + req.uid + "', now())";
        }
        return sqlcmd;
    }

    function getsqlcmd(req) {
        if (req.tbname == "getquotation") {
            // var sqlcmd = "SELECT quocode,saleid,custid,billtoname,billtoaddress,paymentterms,totalline,amount,discount,vat,total, DATE_FORMAT(reqdate,'%Y-%m-%d') as reqdate,remark FROM quotation WHERE (quocode LIKE '%" + req.keyword + "%') ";
            var sqlcmd = "SELECT quocode,saleid,custid,billtoname,billtoaddress,paymentterms,totalline,\n" +
                " amount,discount,vat,total,DATE_FORMAT(reqdate,'%Y-%m-%d') as reqdate,remark,sale.fullname as salename,\n" +
                "quotation.createid,quotation.modifiedid,createname.fullname as namecreate, modifiedname.fullname as namemodified \n" +
                " FROM quotation INNER JOIN employee as sale ON quotation.saleid = sale.empid \n" +
                "INNER JOIN employee as createname ON quotation.createid = createname.empid \n" +
                " INNER JOIN employee as modifiedname ON quotation.modifiedid = modifiedname.empid WHERE (quocode LIKE '%" + req.keyword + "%') ";

        } else if (req.tbname == "getproduct") {
            var sqlcmd = "SELECT * FROM product  ";
        } else if (req.tbname == "getquodetail") {
            var sqlcmd = "SELECT * FROM quodetail  ";
            if (req.quocode != undefined) {
                var sqlcmd = "SELECT * FROM quodetail WHERE quocode = '" + req.quocode + "' ";
            };
        } else if (req.tbname == "getcustomer") {
            var sqlcmd = "SELECT custid, custname, custaddress FROM customer";
        } else if (req.tbname == "getemployee") {
            var sqlcmd = "SELECT empid, empcode, fullname FROM employee";
        }
        return sqlcmd;
    }
}
module.exports = new quotation();