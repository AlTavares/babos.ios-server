
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
        query.ascending('name')
        query.notEqualTo('deleted', true)
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

    update: function (plant, callback) {
        var parsePlant = this.parsePlantFromObject(plant)
        if (!plant.image) {
            this.saveParsePlant(parsePlant, callback)
            return
        }
        var parseFile = new Parse.File(plant.image.name, plant.image);
        parseFile.save().then(() => {
            console.debug('FUUUUUUARRRRK')
            parsePlant.set('image', parseFile)
            this.saveParsePlant(parsePlant, callback)
        }, function (error) {
            callback(error, null)
        });


    },

    delete: function (plant, callback) {
        var parsePlant = this.parsePlantFromObject(plant)
        parsePlant.set('deleted', true)
        this.saveParsePlant(parsePlant, callback)
    },

    saveParsePlant: function (parsePlant, callback) {
        console.debug('CALLLBACURURURU')
        parsePlant.save(null, {
            success: function (result) {
                update = true
                callback(null, result)
            },
            error: function (result, error) {
                callback(error, null)
            }
        })
    },

    parsePlantFromObject: function (obj) {
        var plant = new Plant()
        plant.id = obj.objectId
        var ignore = ['objectId', 'createdAt', 'updatedAt', 'image']
        for (var key in obj) {
            if (obj.hasOwnProperty(key) && ignore.indexOf(key) == -1) {
                plant.set(key, obj[key])
            }
        }
        return plant
    }

}

export default Plants