let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");


//create reference to the model (dbschema )
let CarList = require("../models/cars");

module.exports.displayCarList = (req, res, next) => {
  CarList.find((err, CarList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("cars/index", {
        title: "CarList",
        CarList: CarList,
        carName: req.CarList ? req.CarList.Carname : "",
      });
    }
  });
};

module.exports.caraddpage = (req, res, next) => {
  res.render("cars/add", {
    title: "Add Car",
    carName: req.CarList ? req.CarList.Carname : ""
  });
};

module.exports.addprocesspage = (req, res, next) => {
  
  let newCarDetail = CarList({
    Carname: req.body.Carname,
    Category: req.body.Category,
    Carmodel: req.body.Carmodel,
    Price:req.body.Price,
  });
  console.log(newCarDetail);
  CarList.create(newCarDetail, (err, CarList) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the BusinessContact list
      res.redirect("/cars");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  CarList.findById(id, (err, CarListedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("cars/details", {
        title: "Edit Car",
        Caredit: CarListedit,
        carName: req.CarList ? req.CarList.Carname : "",
      });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatecarList = CarList({
    _id: id,
    Carname: req.body.Carname,
    Category: req.body.Category,
    Carmodel: req.body.Carmodel,
  });
  CarList.updateOne({ _id: id }, updatecarList, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the businesscontact list
      res.redirect("/cars");
    }
  });
};


module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  CarList.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/cars");
    }
  });
};
