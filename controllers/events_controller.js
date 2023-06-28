//DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { event } = db
const { Op } = require('sequelize')

// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundevents = await event.findAll({
            order: [ ['available_start-time', ASC] ],
            where: { name: { [Op. like]: `%${req.query.name ? req.query.name : ''}%` } }
        })
        res.status(200).json(foundevents)
    } catch(err) {
        console.log(err)
        res.status(500).send('ERROR GETTING ALL EVENTS')
    }
})

// FIND A SPECIFIC EVENT
events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: MeetGreet,
                    as: 'meet_greets',
                    include: {
                        model: Band,
                        as: 'band'
                    }
                },
                {
                    model: SetTime,
                    as: 'set_times',
                    include: [
                        {
                            model: Band,
                            as: 'band'
                        },
                        {
                            model: Stage,
                            as: 'stage'
                        }
                    ]
                },
                {
                    model: Stage,
                    as: 'stages',
                    through:  { attributes: [] }
                }
            ]
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

events.post('/', async (req, res) => {
    try {
        const newevent = await event.create(req.body)
        res.status(200).json({message: "Created a new event!", data: newevent})
    } catch(err) {
        console.log(err)
        res.status(500).send('ERROR GETTING ALL EVENTS')
    }
})

events.put('/:id', async (req, res) => {
    try {
        const updatedevents = await event.update(
            req.body,
            { where: {event_id: req.params.id} })
        res.status(200).json({message: 'updated ${updatedevents} events!'})
    } catch(err) {
    console.log(err)
    res.status(500).send('ERROR GETTING ALL EVENTS')
 }
})

events.delete('/:id', async (req, res) => {
    try {
        const deletedevents = await event.destroy(
            { where: {event_id: req.params.id} })
        res.status(200).json({message: 'Successfully deleted event id ${req.params.id}'})
    } catch(err) {
    console.log(err)
    res.status(500).send('ERROR DELETING EVENTS')
 }
})

// Export
module.exports = events