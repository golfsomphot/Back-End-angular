
const connectdatabase = require('../connectdata');
function products() {

    this.getSearch = async function (req, res) {
        var result = { code: "000", msg: "", data: null }
        console.log("req:", req);
        try {
            var sql = "SELECT productcode,productid,productname,unitid,qtyperpack,price  FROM product WHERE (productname LIKE'%" + req.keyword + "%') OR (productcode LIKE'%" + req.keyword + "%') ORDER BY productname ASC";

            // console.log("sql",sql);

            var jsondata = await connectdatabase.getdata(sql, true, false);
            // console.log("jsondata:",jsondata);

            if (jsondata.data != undefined) {
                result.data = jsondata.data;
                result.msg = jsondata.msg;
            } else {

                result.msg = "no products data";
            }

        } catch (error) {

        }
        res.send(result);
    }

    //ฟังชั่น INSERT product
    this.getINSERT = async function (req, res) {
        var result = { code: "000", msg: "", data: null }
        var data = req.data;
        // console.log("req :", req);

        try {
            var sql = "INSERT INTO product (productcode,productid,productname ,unitname,qtyperpack,price,remark,createdate,modifieddate,pic)\n" +
                // "ON DUPLICATE KEY UPDATE productid=productid+1\n" +
                "VALUES ( '" + data.productsid + "','" + data.productsid + "','" + data.productsname + "',\n" +
                "'" + data.unit + "','" + data.qtyperpack + "','" + data.price + "','" + data.remark + "' , NOW(),NOW(),'" + req.pic + "');"
            //  "ON DUPLICATE KEY UPDATE productid =  '" + data.productsid + "'+1;"
            // console.log("sql:", sql);

            var jsondata = await connectdatabase.getdata(sql, true, false);

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


}
module.exports = new products();