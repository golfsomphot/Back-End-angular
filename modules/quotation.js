const connectdatabase = require('../connectdata');
function quotation() {
    this.quotations = async function (req, res) {
        var result = { code: "000", msg: "", data: null }

        try {
            var sql = getsqlcmd(req);
            var jsondata = await connectdatabase.getdata(sql, true, false);
            // console.log("jsondata:",jsondata);

            if (jsondata.data != undefined) {
                result.data = jsondata.data;
                result.msg = jsondata.msg;
            } else {

                result.msg = "no quotaion data";
            }

        } catch (error) {

        }
        res.send(result);
    }
    this.createquotation = async function (req, res) {
        var result = { code: "000", msg: "", data: null }
        var data = req.data;
        console.log("req :", req);
        try {
            var sql = "INSERT INTO quodetail (quocode,item )\n" +
                "VALUES ( '" + data.quocode + "','" + data.item + "' \n" 
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








    function getsqlcmd(req) {
        var sqlcmd = "";
        console.log("req:", req);
        if (req.tbname == "pdquotation") {
            sqlcmd = "SELECT * FROM quotaion WHERE quocode LIKE'%" + req.quocode + "%'";
        }

        return sqlcmd;
    }
}
module.exports = new quotation();