const express = require('express');
const router = express.Router();
const Event = require('../Models/horas'); // Asegúrate de tener tu modelo de eventos definido

// Ruta para agregar un evento
router.post('/addEvent', async (req, res) => {
    try {

        console.log('Datos recibidos para el nuevo evento:', req.body);
        
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json({ message: 'Evento agregado correctamente.' });
    } catch (error) {
        console.error('Error al agregar el evento:', error);
        res.status(500).json({ message: 'Error interno del servidor al agregar el evento.' });
    }
});

// Ruta para obtener todos los eventos
router.get('/getAllEvents', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener los eventos.' });
    }
});

router.delete('/deleteEvent/:eventId', async (req, res) => {
    try {
      const eventId = req.params.eventId;
  
      // Eliminar el evento por su ID
      const deletedEvent = await Horas.findByIdAndRemove(eventId);
  
      if (!deletedEvent) {
        return res.status(404).json({ message: 'Evento no encontrado.' });
      }
  
      res.status(200).json({ message: 'Evento eliminado correctamente.' });
    } catch (error) {
      console.error('Error during operation:', error);
      res.status(500).json({ message: 'Error al eliminar el evento.' });
    }
});

module.exports = router;
