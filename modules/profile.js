const connectdatabase = require('../connectdata');
function profile() {
    this.uploadprofile = async function (req, res) {
        var result = { code: "000", msg: "", data: null }
         console.log("req",req);
         
        try {
            var sql = "INSERT INTO employee(pic)\n" +
            "VALUES ( '" + req.pic + "') ;"
            var jsondata = await connectdatabase.getdata(sql, true, false);
            // console.log("jsondata:",jsondata);

            if (jsondata.data != undefined) {
                result.data = jsondata.data;
                result.msg = jsondata.msg;
            } else {

                result.msg = "ไม่สามารถอัพโหลดได้";
            }

        } catch (error) {

        }
        res.send(result);
    }
}
module.exports = new profile();