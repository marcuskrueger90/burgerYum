var connection = require('../config/connection');

function createQmarks(num){
    var arr =[];
    for(var i=0; i< num; i++){
        arr.push('?');
    }
    return arr.toString();
}

function translateSql(ob){
    var arr = [];
    for (var key in ob){
        var value = ob[key];
        if(Object.hasOwnProperty.call(ob, key)){
            if(typeof value === 'string' && value.indexOf(' ') >= 0){
                value =`"${value}"`;
            }
            arr.push(`${key}=${value}`)
        }
    }
    return arr.toString();
}


var orm = {
    selectAll: function(table, cb){
        var dbQuery = `SELECT * FROM ${table};`;
        console.log(cb, "this is cb")
        console.log(table, "this is table")
        connection.query(dbQuery, function(err,res){
            if(err){
                throw err;
            }
            cb(res)
            
        
        })
    },

    insertOne: function(table, cols, vals, cb){
    
        var dbQuery = 

        `INSERT INTO ${table} (${cols.toString()}) VALUES ('${vals[0]}', ${vals[1]})`
    
        console.log(dbQuery);

        connection.query(dbQuery, translateSql(vals), function(err,res){
            if(err){
                throw err;
            }
            cb (res);
        })
    },
    updateOne: function(table, objColVals, condition, cb){
        
        var dbQuery =`UPDATE ${table} SET ${translateSql(objColVals)} WHERE ${condition}`;

        

        connection.query(dbQuery, translateSql(objColVals), function(err,res){
            if(err){
                throw err;
            }
            cb(res);
        })

    },
    deleteOne: function(table, condition, cb){
        var dbQuery = `DELETE FROM ${table} WHERE ${condition}`;


        connection.query(dbQuery, translateSql(condition), function(err,res){
            if(err){
                throw err;
            }
            cb(res);
        })
    }
}
module.exports = orm;