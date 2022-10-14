const {CarModel} = require("../models/carModel");
const {validateCar} = require("../validation/carValid");

exports.carCtrll = {
    getAll : async (req, res)=> {
        let perPage =Math.min(req.query.perPage, 20) || 10;
        let page = req.query.page || 1;
        let sort = req.query.sort || "_id"
        let reverse = req.query.reverse == "yes"? -1 : 1
      
        try{
          let data = await CarModel.find({})
          .limit(perPage)
          .skip((page - 1) * perPage)
      
          .sort({[sort]:reverse})
          res.json(data);
        }
        catch(err){
          console.log(err);
          res.status(500).json({msg:"there error try again later",err})
        }
      },
      search : async (req, res)=> {
        try{
          let queryS = req.query.s;
          
          let searchReg = new RegExp(queryS,"i")
          let data = await CarModel.find({name:searchReg})
          .limit(50)
          res.json(data);
        }
        catch(err){
          console.log(err);
          res.status(500).json({msg:"there error try again later",err})
        }
      },
      searchC : async (req, res) => {
        let perPage = Math.min(req.query.perPage, 20) || 10;
        let page = req.query.page || 1;
        try {
            let searchQ = req.params.catname;
            let searchReg = new RegExp(searchQ, "i");
            let books = await BookModel.find({ category: searchReg })
                .limit(perPage)
                .skip((page - 1) * perPage)
            res.json(books);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    },
    price : async (req, res) => {
        let perPage = Math.min(req.query.perPage, 20) || 10;
        let page = req.query.page || 1;
        try {
            let min = req.query.min;
            let max = req.query.max;
            let books = await BookModel.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }] })
                .limit(perPage)
                .skip((page - 1) * perPage)
            res.json(books);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    },
    //   at cars.js it is router.get("price") cahnge at the documentation!!!!!!
      byPrice: async (req, res) => {
        const max = req.query.max;
        const min = req.query.min;
    
        try {
            if (max && min) {
                let data = await CarModel.find({ $and: [{ price: { $gte: min } }, { price: { $lte: max } }] })
                console.log(data)
                if (!data.length)
                    return res.status(400).json({ msg: "no cars" })
    
                res.json(data)
            } else if (min) {
                let data = await CarModel.find({ price: { $gte: min } })
                if (!data.length)
                    return res.status(400).json({ msg: "no cars" })
    
                res.json(data)
            } else if (max) {
                let data = await CarModel.find({ price: { $lte: max } })
                if (!data.length)
                    return res.status(400).json({ msg: "no cars" })
    
                res.json(data)
            } else {
                let data = await CarModel.find({})
                if (!data)
                    return res.status(400).json({ msg: "no car" })
                res.json(data)
    
            }
            
           
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    },
    post :async (req, res)=> {
        let validBody = validateCar(req.body);
        if(validBody.error){
          return res.status(400).json(validBody.error.details);
        }
        try{
          let car = new CarModel(req.body);
          
          car.user_id = req.tokenData._id;
          await car.save();
          res.status(201).json(car);
        }
        catch(err){
          console.log(err);
          res.status(500).json({msg:"there error try again later",err})
        }
      },
      edit : async (req, res)=> {
        let validBody = validateCar(req.body);
        if(validBody.error){
          return res.status(400).json(validBody.error.details);
          
        }
        try{
          let editId = req.params.editId;
          let data;
          console.log(data)
          console.log(editId)
          if(req.tokenData.role == "admin"){
            data = await CarModel.updateOne({_id:editId},req.body)
           
          }
          
          else{
             data = await CarModel.updateOne({_id:editId,user_id:req.tokenData._id},req.body)
             
            }
            res.json(data);
          
        }
        catch(err){
          console.log(err);
          res.status(500).json({msg:"there error try again later",err})
        }
      },
      delete : async (req, res)   => {
        try{
          let delId = req.params.delId;
          let data;
         
          if(req.tokenData.role == "admin"){
            data = await CarModel.deleteOne({_id:delId})
          }
          else{
            data = await CarModel.deleteOne({_id:delId,user_id:req.tokenData._id})
          }
          res.json(data);
        }
        catch(err){
          console.log(err);
          res.status(500).json({msg:"there error try again later",err})
        }
      }
}