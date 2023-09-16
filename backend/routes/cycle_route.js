const Cycle = require('../models/cycle');
let router = require('express').Router();
const { Sequelize } = require('sequelize');
const Former = require('../models/former');
const Participant = require('../models/participant');

//get all Cycles
router.get('/all', (req, res) => {
    Cycle.findAll({
        include: [
            { model: Former },
            { model: Participant }
        ]
    }).then((result) => {
        return res.status(200).json({ data: result });
    }).catch(err => {
        return res.status(500).json({ message: err });
    });;
});

//get cycle by id
router.get('/by_id/:id', async (req, res) => {
    try {
        let cycle = await Cycle.findByPk(req.params.id, { include: Former });
        if (!cycle) {
            return res.status(404).json({ message: 'Cycle not found!' });
        }
        return res.status(200).json({ data: cycle })
    } catch (e) {
        return res.status(500).json({ message: 'Internal server error!' });
    }
});

//add cycle
router.post('/add', (req, res) => {
    Cycle.create({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        roomNumber: req.body.roomNumber
    }).then((former) => {
        return res.status(201).json({ message: "Successfully added", data: former })
    }).catch(err => {
        return res.status(500).json({ error: "Server Error: " + err });
    });
});

//update cycle
router.put('/update/:id', (req, res) => {
    Former.update({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        roomNumber: req.body.roomNumber
    },
        {
            where: {
                former_id: req.params.id
            }
        }
    ).then(result => {
        return res.status(201).json({ message: "Successfully updated", data: result });
    }).catch(err => {
        return res.status(500).json({ error: "Server Error:" + err });
    });
});

//Delete cycle
router.delete('/delete/:id', async (req, res) => {
    try {
        let cycleToDelete = await Cycle.findOne({ where: { cycle_id: req.params.id } });
        if (!cycleToDelete) {
            return res.status(404).json({ message: "No former with this id!" });
        }
        cycleToDelete.removeFormers();

        await cycleToDelete.destroy();

        return res.status(201).json({ message: "Successfully deleted!" });

    } catch (e) {
        return res.status(500).json({ message: "Error while deleting former!" });
    }
});

//Add former to cycle
router.post('/add_former/:id_former/:id_cycle', async (req, res) => {
    try {
        let former = await Former.findByPk(req.params.id_former);
        if (!former) {
            return res.status(404).json({ message: "Former not found!" });
        }
        let cycle = await Cycle.findByPk(req.params.id_cycle);
        cycle.addFormer(former);
        return res.status(201).json({ message: "Successfully added!" });
    } catch (e) {
        return res.status(500).json({ message: "Error while adding former!" });
    }
});

module.exports = router;

