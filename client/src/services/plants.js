
import Parse from 'parse'

var Plant = Parse.Object.extend("Interaction")


function Query() {
    return new Parse.Query(Plant)
}
var update = true
var list = []

var Plants = {

    get: function (callback) {
        if (!update) {
            return callback(list)
        }
        let query = Query()
        query.find({
            success: function (plants) {
                // The object was retrieved successfully.
                console.debug('service', plants)
                list = plants.map(obj => obj.toJSON())
                update = false
                callback(list)
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
    },

    delete: function (plant) {
        var parsePlant = this.parsePlantFromObject(plant)
        parsePlant.set('deleted', true)
        parsePlant.save()
    },

    parsePlantFromObject: function (obj) {
        var plant = new Plant()
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                plant.set(key, obj[key])
            }
        }
        return plant
    }

}

export default Plants