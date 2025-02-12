const pool = require('../config/database');

const submissionController = {
  showSubmitForm: (req, res) => {
    res.render('submit');
  },

  submitApplication: (req, res) => {
    const { name, vehicle, amount } = req.body;
    const sql = "INSERT INTO submissions (name, vehicle, amount, status) VALUES (?, ?, ?, ?)";
    pool.query(sql, [name, vehicle, amount, 'Pending'], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Terjadi kesalahan saat menyimpan data.");
      }
      res.redirect('/thankyou');
    });
  },

  showThankYou: (req, res) => {
    res.send(`
      <h2>Terima kasih atas pengajuan Anda!</h2>
      <p><a href="/">Kembali ke Home</a></p>
    `);
  }
};

module.exports = submissionController; 