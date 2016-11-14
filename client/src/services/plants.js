
import Parse from 'parse'

var Plant = Parse.Object.extend("Interaction")


function Query() {
    return new Parse.Query(Plant)
}

var Plants = {

    get: function (callback) {
        let query = Query()
        query.find({
            success: function (plants) {
                // The object was retrieved successfully.
                console.debug('service', plants)
                callback(plants.map(obj => obj.toJSON()))
            },
            error: function (object, error) {
                console.debug(object, error)
                callback(null)
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
            }
        })
    },

    getPlant: function (id, callback) {
        let query = Query()
        query.get(id, {
            success: function (plant) {
                // The object was retrieved successfully.
                callback(plant.toJSON())
            },
            error: function (object, error) {
                console.debug(object, error)
                callback(null)
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
            }
        })
    }
}

export default Plants