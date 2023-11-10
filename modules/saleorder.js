const connectdatabase = require('../connectdata');
function saleorder() {
    this.getSearchsaleorder = async function (req, res) {
        var result = { code: "000", msg: "", data: null }
        console.log("req", req);
        try {
            var sql = "SELECT so FROM so WHERE socode LIKE'%" + req.socode + "%'";
            var jsondata = await connectdatabase.getdata(sql, true, false);
            // console.log("sql:", sql);

            if (jsondata.data != undefined) {
                result.data = jsondata.data;
                result.msg = jsondata.msg;
            } else {

                result.msg = "no saleorder data";
            }

        } catch (error) {

        }
        res.send(result);
    }
}
module.exports = new saleorder();