
import Parse from 'parse'

var Plant = Parse.Object.extend("Interaction")
var query = new Parse.Query(Plant);


var Plants = {

    get: function (callback) {
        query.find({
            success: function (plants) {
                // The object was retrieved successfully.
                callback(plants.map(obj => obj.toJSON()))
            },
            error: function (object, error) {
                console.debug(object, error)
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
            }
        })
    }
}

export default Plants