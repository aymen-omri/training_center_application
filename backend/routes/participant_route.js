const Cycle = require('../models/cycle');
const Participant = require('../models/participant');
let router = require('express').Router();
const { Sequelize } = require('sequelize');

//Register participant
router.post('/register/:cycle_id', async (req, res) => {
    try {
        let cycle = await Cycle.findByPk(req.params.cycle_id);
        let cycleParticipants = await cycle.getParticipants();
        console.log(cycleParticipants);
        let ifExists = (participant) => {
            return cycleParticipants.some(value => value.email == participant.email);
        }
        let existedParticipant = await Participant.findOne({ where: { email: req.body.email } });
        if (existedParticipant) {
            if (ifExists(existedParticipant)) {
                return res.status(409).json({ message: "This user is already registered in this cycle" });
            }
            cycle.addParticipant(existedParticipant);
            return res.status(200).json({ message: "An existed user registred successfully!" });
        }
        const newParticipant = {
            fullname: req.body.fullname,
            foundation: req.body.foundation,
            landLine: req.body.landLine,
            fax: req.body.fax,
            mobilePhone: req.body.mobilePhone,
            email: req.body.email,
        };
        let insertedParticipant = await Participant.create(newParticipant);

        cycle.addParticipant(insertedParticipant);

        return res.status(201).json({ message: "inserted successfully!" });
    } catch (err) {
        return res.status(500).json({ message: "error while adding a participant!", err: err });
    }
});

//get all participants
router.get('/all', (req, res) => {
    Participant.findAll().then(result => {
        return res.status(200).json({ data: result });
    }).catch(err => {
        return res.status(500).json({ message: "Internal server error!" });
    });
});

//update participant
router.put('/update/:id', (req, res) => {
    Participant.update({
        fullname: req.body.fullname,
        foundation: req.body.foundation,
        landLine: req.body.landLine,
        fax: req.body.fax,
        mobilePhone: req.body.mobilePhone,
        email: req.body.email,
    },
        {
            where: {
                par_id: req.params.id
            }
        })
        .then(result => {
            return res.status(201).json({ message: "Successfully updated", data: result });
        })
        .catch(err => {
            return res.status(500).json({ error: "Server Error:" + err });
        });

});

module.exports = router; 