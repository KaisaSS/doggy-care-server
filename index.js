const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");

// middleware
app.use(cors());
app.use(express.json());

// create a new owner
app.post("/owners", async (req, res) => {
  try {
    const { first_name, last_name, email, mobile, flat, street, postcode, city } = req.body;
    const newOwner = await pool.query(
      "INSERT INTO owners (first_name, last_name, email, mobile, flat, street, postcode, city) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [first_name, last_name, email, mobile, flat, street, postcode, city]
    );
    res.json(newOwner.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update owner
app.put("/owners/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, mobile, flat, street, postcode, city } = req.body;
    const updateOwner = await pool.query(
      "UPDATE owners SET first_name = $1, last_name = $2, email = $3, mobile = $4, flat = $5, street = $6, postcode = $7, city = $8 WHERE customer_id = $9",
      [first_name, last_name, email, mobile, flat, street, postcode, city, id]
    );
    res.json("Owner details updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(4000, () => {
  console.log("server has started on port 4000");
});
