//DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { stage } = db
const { Op } = require('sequelize')

//FIND ALL STAGES
stages.get('/', async (req, res) => {
    try {
        const foundstages = await stage.findAll({
            order: [ ['available_start-time', ASC] ],
            where: { name: { [Op. like]: `%${req.query.name ? req.query.name : ''}%` } }
        })
        res.status(200).json(foundstages)
    } catch(err) {
        console.log(err)
        res.status(500).send('ERROR GETTING ALL STAGES')
    }
})

//FIND A SPECIFIC STAGE

stages.get('/:name', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_name: req.params.name },
            include: {
                model: Event,
                as: 'events',
                through: { attributes: [] }
            }
        })
        res.status(200).json(foundStage)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

stages.post('/', async (req, res) => {
    try {
        const newstage = await stage.create(req.body)
        res.status(200).json({message: "Created a new stage!", data: newstage})
    } catch(err) {
        console.log(err)
        res.status(500).send('ERROR GETTING ALL STAGES')
    }
})

stages.put('/:id', async (req, res) => {
    try {
        const updatedstages = await stage.update(
            req.body,
            { where: {stage_id: req.params.id} })
        res.status(200).json({message: 'updated ${updatedstages} stages!'})
    } catch(err) {
    console.log(err)
    res.status(500).send('ERROR GETTING ALL STAGES')
 }
})

stages.delete('/:id', async (req, res) => {
    try {
        const deletedstages = await stage.destroy(
            { where: {stage_id: req.params.id} })
        res.status(200).json({message: 'Successfully deleted stage id ${req.params.id}'})
    } catch(err) {
    console.log(err)
    res.status(500).send('ERROR DELETING STAGES')
 }
})

// Export
module.exports = stages