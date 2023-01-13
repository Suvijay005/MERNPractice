
const express = require("express");
//const { modelNames } = require("mongoose");
const mongoose = require("mongoose");
var schema = mongoose.Schema;
var router = express.Router();
//first step is design model using mongoose schema and insert the schema data into that model
var empschema = new schema({
    empid: String,
    ename: { type: String, trim: true, required: true },
    sal: String
});
var Emp = mongoose.model('emptab', empschema, 'emptab');
router.get("/employee", (req, res) => {
    Emp.find().exec((err, data) => {
        if (err) {
            res.status(500).send("no data found");
        }
        else {
            res.send(data);
        }

    })

});

router.get("/employee/:empid", (req, res) => {
    //console.log("empid: " + req.params.empid);
    Emp.find({empid:req.params.empid}).exec((err, data) => {
        if (err) {
            res.status(500).send("no data found");
        }
        else {
            res.send(data);
        }
    })
});


//tp insert data into the database i.e to add data handle to post request
router.post("/employee", (req, res) => {
    var empob = new Emp({ empid: req.body.empid, ename: req.body.ename, sal: req.body.sal })
    empob.save((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("no data added");
        }
        else {
            res.send(data);
        }
    })

});
//update the data in the database with empid
router.put("/employee/:empid", (req, res) => {
    console.log(req.body);
    Emp.findOne({ empid: req.body.empid }, (err, document) => {
        if (err) {
            console.log(err);
            res.status(500).send("no data updated");
        }
        else {
            console.log("in else part");
            document.empid = req.body.empid;
            document.ename = req.body.ename;
            document.sal = req.body.sal;
            document.save((err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("no data updated");
                }
                else {
                    res.send(data);
                }
            })
        }
    })
});

//delete the document with the help of empid
router.delete("/employee/:empid", (req, res) => {
    Emp.remove({ empid: req.body.empid }, (err, document) => {
        if (err) {
            res.status(500).send("record not deleted");
        }
        else {
            res.status(200).send("deleted successfully");
        }
    })
});
module.exports = router;