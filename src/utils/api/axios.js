'use strict'

import axios from 'axios'

// access root of the project
const projectRoot = require('app-root-path')

/**
 * Axios Service
 *
 */
function axiosService() {
	this.getAxios = function () {
		var token = localStorage.getItem('authToken')
		if (token) {
			axios.defaults.headers. ['Authorization'] = 'JWT ' + token
			return axios
		} else {
			return axios
		}
	}
}

axiosService = new axiosService()

export default axiosService
