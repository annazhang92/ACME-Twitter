const pg=require('pg');

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();


const SQL_SYNC =`
    DROP TABLE IF EXISTS users;
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name varchar(255),
        text varchar(255)
    );
`;

const SQL_SEED =`
    INSERT INTO users(name,text) values ('foo','Tweet details to go here -- foo');
    INSERT INTO users(name,text) values ('bar','Tweet details to go here -- bar');
    INSERT INTO users(name,text) values ('bazz','Tweet details to go here -- bazz');
`;

const sync = (cb) =>{
    client.query(SQL_SYNC, cb);
};

const seed = (cb) =>{
    client.query(SQL_SEED, cb);
};

// const getUsers = (cb) =>{
//     client.query(`SELECT * from users`, (err,result)=>{
//         if(err) return cb(err);
//         cb(null, result.rows);
//     });
// };

const getPeople =(cb) =>{
    client.query(`SELECT * FROM users`, (err,result)=>{
        if(err) return cb(err);
        cb(null, result.rows);
    });
}

const getTweet = (id, cb)=> {
    client.query(`SELECT text FROM users WHERE id = $1`, [id], (err, result)=> {
      if(err) return cb(err)
      cb(null, result.rows.length ? result.rows[0] : null)
    })
  }

module.exports ={
    sync,
    getPeople,
    getTweet,
    seed
};