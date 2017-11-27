
import axios from "axios";
//const APIKEY = "2cf05646712d49639c765623bbbb99ea";
const queryURLBase = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDM80HdqN8I7OZaOY9B8MUjFa3kguMhB_E&callback=initMap"
export default {


	
	saveArticle:function(articleData) {
		return axios.post("/api/saved", articleData);
	},
	savedArticles:function() {
		return axios.get("/api/saved");
	},
	deleteArticle:function(id) {
		return axios.delete("/api/saved/"+ id);
	},
	userLogin: function(userData) {
			return axios.post("/existinguser",userData)
	}

};