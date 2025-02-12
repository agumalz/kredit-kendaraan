const pool = require('../config/database');

const dashboardController = {
  showDashboard: (req, res) => {
    const submissionsQuery = 'SELECT * FROM submissions';
    const countQuery = `
        SELECT 
            COUNT(CASE WHEN status = 'Pending' THEN 1 END) as pendingCount,
            COUNT(CASE WHEN status = 'Approved' THEN 1 END) as approvedCount,
            COUNT(CASE WHEN status = 'Rejected' THEN 1 END) as rejectedCount
        FROM submissions;
    `;

    pool.query(submissionsQuery, (error, submissions) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Terjadi kesalahan saat mengambil data.");
      }

      pool.query(countQuery, (error, counts) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Terjadi kesalahan saat mengambil data statistik.");
        }

        res.render('dashboard', {
          submissions: submissions,
          pendingCount: counts[0].pendingCount || 0,
          approvedCount: counts[0].approvedCount || 0,
          rejectedCount: counts[0].rejectedCount || 0
        });
      });
    });
  },

  approveSubmission: (req, res) => {
    const id = req.body.id;
    const sql = "UPDATE submissions SET status = 'Approved' WHERE id = ?";
    pool.query(sql, [id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Terjadi kesalahan saat melakukan approve.");
      }
      res.redirect('/dashboard');
    });
  },

  rejectSubmission: (req, res) => {
    const id = req.body.id;
    const sql = "UPDATE submissions SET status = 'Rejected' WHERE id = ?";
    pool.query(sql, [id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Terjadi kesalahan saat melakukan reject.");
      }
      res.redirect('/dashboard');
    });
  }
};

module.exports = dashboardController; 