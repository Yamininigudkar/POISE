
export const notches = [
{
  category: 'hiking',
  location: [ '20.5', '78.9' ],
  headline: 'India',
  user: { 
    name: 'yam',
    id: '1'
  },
  experience: 'this hiking trip to india was a great experience'
},
{
  category: 'education',
  location: [ '40.7', '74.0' ],
  headline: 'New York',
  user: { 
    name: 'yam',
    id: '1'
  },
  experience: 'this academic trip to new york was a great experience'
},
{
  category: 'eduation',
  location: [ '20.5', '78.9' ],
  headline: 'India',
  user: { 
    name: 'alina',
    id: '2'
  },
  experience: 'this academic trip to india was a great experience'
},
{
  category: 'hiking',
  location: [ '40.7', '74.0' ],
  headline: 'New York',
  user: { 
    name: 'alina',
    id: '2'
  },
  experience: 'this hiking trip to new york was a great experience'
},
]
var fs = require("fs");

fs.readFile('image.jpg', function(err, data) {
  if (err) throw err;

  // Encode to base64
  var encodedImage = new Buffer(data, 'binary').toString('base64');

  // Decode from base64
  var decodedImage = new Buffer(encodedImage, 'base64').toString('binary');
});