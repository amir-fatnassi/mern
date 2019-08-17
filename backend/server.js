const express=require('express')
const {MongoClient,ObjectID}=require('mongodb')
const assert =require('assert')
const BodyParser=require('body-parser')

const app=express()
app.use(BodyParser.json())
const mongoURL='mongodb://localhost:27017'
const database='first-api'
MongoClient.connect(mongoURL,{useNewUrlParser:true},(err,client)=>{
    assert.equal(err,null,'can not connect to database')
    const db=client.db(database)


    //add contact
    app.post('/add-contact',(req,res)=>{
        let newcontact=req.body
        db.collection('product').insertOne(newcontact,(err,data)=>{
            if(err) console.log('can not add new contact')
            else res.send(data)
        })
    })
   //get contact
   app.get('/get-contact',(req,res)=>{
       db.collection('product').find().toArray((err,data)=>{
        if(err) console.log('can not get the contact')
        else res.send(data)
       })
   }) 
   //delete  contact
   app.delete('/delete-contact/:id',(req,res)=>{
       let id=ObjectID(req.params.id)
       db.collection('product').findOneAndDelete({_id:id},(err,data)=>{
        if(err) console.log('can not delete the contact')
        else res.send(data)
       })
   })
   //edit contact
   app.put('/edit-contact/:id',(req,res)=>{
       let editcontacte=req.body
       let id=ObjectID(req.params.id)
       db.collection('product').findOneAndUpdate({_id:id},{$set:{...editcontacte}},(err,data)=>{
        if(err) console.log('can not edite the contact')
        else res.send(data)
       })
   })

})










app.listen(4200,(err)=>{
    if(err) console.log('can not run on port 5070')
    else console.log('the server is running on port 4200')
})