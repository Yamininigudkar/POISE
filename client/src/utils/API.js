
import axios from "axios";
//const APIKEY = "2cf05646712d49639c765623bbbb99ea";
const queryURLBase = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDM80HdqN8I7OZaOY9B8MUjFa3kguMhB_E&callback=initMap"
export default {


	
	
	userLogin: function(userData) {
			return axios.post("/existinguser",userData)
	},
	userSignUp: function(userData) {
			return axios.post("/newuser",userData)
	}

};