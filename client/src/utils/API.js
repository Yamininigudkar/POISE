
import axios from "axios";
//const APIKEY = "2cf05646712d49639c765623bbbb99ea";
//const queryURLBase = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBZh02mPHBCAq3ZCKxRCKJwjx0e_fgYi5Y&callback=initMap"
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
	userNotches:function(){
		return axios.post('/userNotches')
	}

};