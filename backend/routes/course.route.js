const express=require('express');
const Course=require('../models/course');
const router=express.Router();  
const authMiddleware=require('../middleware/authMiddleware');

router.get('/',authMiddleware,async(req,res)=>{
    try{
        const courses=await Course.find();  
        res.json(courses);
    }catch(err){
        res.status(500).json({message:err.message});
    }       
});
//create course
router.post('/add',authMiddleware,async(req,res)=>{ 
    if(!req.body.name){
        return res.status(400).json({message:"Course name is required"});
    }
    const course=await Course.create(req.body);
    res.status(201).json(course);
});
//update course
router.put('/update/:id',authMiddleware,async(req,res)=>{
    try{
        const course=await Course.findByIdAndUpdate (req.params.id,req.body,{new:true});
        if(!course){
            return res.status(404).json({message:"Course not found"});
        }       
        res.json(course);
    }catch(err){
        res.status(500).json({message:err.message});
    }       
});
//delete course
router.delete("/delete/:id",authMiddleware,async(req,res)=>{
    try{
        const course=await Course.findByIdAndDelete(req.params.id);     
        if(!course){
            return res.status(404).json({message:"Course not found"});  
        }
        res.json({message:"Course deleted"});       
    }catch(err){
        res.status(500).json({message:err.message});
    }       
});
module.exports=router;
