const customer = require('./modules/customer');
const employees = require('./modules/employees');
const products = require('./modules/products');
const profile = require('./modules/profile');
const quotation = require('./modules/quotation');
const saleorder = require('./modules/saleorder');
const userdata = require('./modules/userdata')

// const profile = require('./modules/profile')
// var md5 = require('md5');
// เป็นการนำเข้าโมดูล (module) ใน Node.js โดยใช้คำสั่ง require ใส่ที่userdata
module.exports = {
    configure: function (app) {
        app.post('/getdatalogin', (req, res) => {
            userdata.getlogin(req.body, res);
        });
        //พาทprofile 
        app.post('/updateImage', (req, res) => {

            userdata.getprofile(req.body, res);
        });
        app.post('/employees', (req, res) => {

            employees.getSearch(req.body, res);
        });
        app.post('/customers', (req, res) => {

            customer.getSearch(req.body, res);
        });
        app.post('/products', (req, res) => {

            products.getSearch(req.body, res);
        });
        app.post('/productsinsert', (req, res) => {

            products.getINSERT(req.body, res);
        });
        app.post('/insertemployee', (req, res) => {
            employees.getINSERT(req.body, res);
        });
        app.post('/insertcustomer', (req, res) => {
            customer.getINSERT(req.body, res);
        });
        app.post('/saleorder', (req, res) => {
            saleorder.getSearchsaleorder(req.body, res);
        });
        app.post('/profileupload', (req, res) => {
            profile.uploadprofile(req.body, res);
        });
        //หน้า quotation
        
        app.post("/getquotation", (req, res) => {
            quotation.getquotation(req.body, res);
            
        });

        app.post("/getquodetail", (req, res) => {
            quotation.getquotation(req.body, res);
        });

        app.post("/quoinsert", (req, res) => {
            quotation.insertquotation(req.body, res);
        });

        app.post("/insertquodetail", (req, res) => {
            quotation.insertquotation(req.body, res);
        });
        
        
        //end quotation

    }
}
