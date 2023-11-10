 
const mysql = require('promise-mysql'); 

function connectdatabase() {
    const config = {
        connecttionLimit: 10,
        host: '127.0.0.1',
        user: 'root',
        password: '1234',
        port: '3306',
        database: 'saleworkshop'
    };
    //ฟั่งชั้น ติดตต่อกับ data
    this.con = async function () {
        //
        try {
            const connection = await mysql.createConnection(config);

            return {
                
                constate: true,
                con: connection,
                msg: "ok"
            }

        } catch (error) {
            console.log(error);
            return {
                constate: false,
                con: null,
                msg: error
            };

        }
    };
    // ส่วนนี้ เป็นการดึงข้อมูล จาก data มาใช้งาน 
    this.getdata = async function (sql, isclose = true, isone = false) {
        const db = await this.con()
        try {
            if (db.constate) {
                var rowdata = await db.con.query(sql); 
                if (JSON.parse(isone) == true) {
                    return { data: rowdata[0], code: "000", msg: "ok" }

                }
                else {
                    return { data: rowdata, code: "000", msg: "ok" }
                }
            } else {
                return { data: null, code: "002", msg: "can't connect database" }

            }
        }

        catch (error) {
            return { data: null, code: "009", msg: "eror" + error }
        } finally {
            if (isclose == true) {
                db.con.end();
            }
        }

    }

    //  เพิ่มข้อมูลในdata
    this.excdata = async function (sql, isclose = true) {
        const db = await this.con()
        try {
            if (db.constate) {
                var rowdata = await db.con.query(sql); //   
                console.log(rowdata);
                if (rowdata.affectedRows == 0) {
                    return { data: null, code: "003", msg: "can't update" }

                }
                else {
                    return { data: rowdata, code: "000", msg: "ok" }
                }
            } else {
                return { data: null, code: "002", msg: "can't connect database" }

            }
        }

        catch (error) {
            return { data: null, code: "009", msg: "eror" + error }
        } finally {
            if (isclose == true) {
                db.con.end();
            }
        }
    }          
}

module.exports = new connectdatabase();
