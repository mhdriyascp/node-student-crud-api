const express = require('express')
const router = express.Router()

/**
 * GET /students
 * To get all students
 */
router.get('/students', (req, res) => {
  const db = req.app.locals.db
  db.find({}, (err, studentsData) => {
    if (err) {
      throw new Error(err)
    }

    res.json({
      status: true,
      message: '',
      data: studentsData
    })
  })
})

/**
 * GET /student/1
 * To get one student
 */
router.get('/student/:id', (req, res) => {
  const db = req.app.locals.db
  db.findOne({_id: req.params.id}, (err, studentData) => {
    if (err) {
      throw new Error(err)
    }

    res.json({
      status: true,
      message: '',
      data: studentData
    })
  })
})

/**
 * POST /student
 * To add a new student
 */
router.post('/student', (req, res) => {
  const db = req.app.locals.db
  db.count({}, (err, cnt) => { // gets the current db record count
    if (err) {
      throw new Error(err)
    }
    // deleting _id element from the student data since
    // its need to be auto incremented
    if ('_id' in req.body) {
      delete req.body._id
    }

    db.insert(req.body, (err, addedData) => { // Inserts the student data
      if (err) {
        throw new Error(err)
      }

      res.json({
        status: true,
        message: 'Student added added successfully',
        data: null
      })
    })
  })
})

/**
 * PUT /student/:id
 * To update student data
 */
router.put('/student/:id', (req, res) => {
  const db = req.app.locals.db
  db.update({ _id: req.params.id }, { $set: req.body }, {}, (err, updatedCount) => {
    if (err) {
      throw new Error(err)
    }

    res.json({
      status: true,
      message: 'Student data updated successfully',
      data: null
    })
  })
})

/**
 * DELETE /student/:id
 * To delete student data
 */
router.delete('/student/:id', (req, res) => {
  const db = req.app.locals.db
  db.remove({_id: req.params.id}, {}, (err, deleteCount) => {
    if (err) {
      throw new Error(err)
    }
    res.json({
      status: true,
      message: 'Student data deleted successfully',
      data: null
    })
  })
})

module.exports = router
