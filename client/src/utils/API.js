
import axios from "axios";

export default {


	
	
	userLogin: function(userData) {
		return axios.post("/existinguser",userData)
	},
	userSignUp: function(userData) {
		return axios.post("/newuser",userData)
	},
	addNotch: function(notchData){
		return axios.post("/newNotch", notchData)
	},
	userlogOut: function(){
		return axios.get('/logout')
	},
	getNotches:function(locationData){
		return axios.post('/getNotches',locationData)
	},
	getAllNotches:function(){
		return axios.get('/notches')
	},
	notchDetails:function(notchid){
		console.log(notchid	, "this is the notchid")
		return axios.get('/findone/'+ notchid)
	},
	imageDetails:function(notchid){
		console.log(notchid	, "this is the notchid")
		return axios.get('/findoneimage/'+ notchid)
	},
	searchData:function(category){
		return axios.get('/notches/list_by_category/'+ category)
	},
	userNotches:function(){
		return axios.get('/userNotches')
	}

};