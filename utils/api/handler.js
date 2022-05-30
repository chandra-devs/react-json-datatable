// import dotenv
require('dotenv').config();
// use API_BASE_URL from .env
const API_BASE_URL = process.env.API_BASE_URL || "http://192.168.29.155:8080/smartmrapi/api";
// import axios
const axios = require('axios');
const { data } = require('jquery');

// {
//     id: 1,
//     dependent_type: "api",
//     method: "post",
//     url: "/register/getPatientById",
//     args: [{ key: "_id", value: "patient_id", type: "internal" }],
//     key: "register_in_status",
//     value: false,
// },

// use sample above request data to post to api=
const handler = (req, res) => {
    const { id, dependent_type, method, url, args, key, value } = req;
    const where = {};
    args.map(arg => {
        where[arg.field] = arg.value;
    });
    console.log(where);
    axios({
        method,
        url: `${API_BASE_URL}${url}`,
        data: where,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlwiNWZiYjkzM2ExM2JjOTU0MmFkNWJmZGMzXCIiLCJpYXQiOjE2NTM2NTc0MzgsImV4cCI6MTY1NDI2MjIzOH0.5nbaoSCD4NcSFwZO2BiAH8gyRCkQeo84QxYcGlGC4wo`
        }
    }).then(response => {
        res(response.data);
    }).catch(err => {
        res(err);
    });
}

module.exports = {
    handler
}