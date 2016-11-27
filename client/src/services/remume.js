import Parse from 'parse'
import env from '../services/environment'

var Remume = Parse.Object.extend("Remume")

function Query() {
    return new Parse.Query(Remume)
}
var update = true
var list = []
var dictionary = {}

var RemumeService = {

    getList: function (callback) {
        if (!update) {
            return callback(list)
        }
        let query = Query()
        query.ascending('group')
        query.notEqualTo('deleted', true)
        query.find({
            success: function (array) {
                // The object was retrieved successfully.
                console.debug('service', array)
                for (var index = 0; index < array.length; index++) {
                    var element = array[index];
                    var obj = element.toJSON()
                    list.push(obj)
                    dictionary[obj.group] = obj
                }
                update = false
                callback(null, list)
            },
            error: function (object, error) {
                console.debug(object, error)
                callback(error, null)
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
            }
        })
    },

    itemFromGroup: function (group) {
        return dictionary[group]
    },

    listIgnoringGroups: function (list, groups) {
        return list.filter(item => groups.indexOf(item.group) == -1)
    },

    descriptionForGroup: function (group) {
        var item = this.itemFromGroup(group)
        if(item) return item.description[env.lang]
        return ''
    }

}

export default RemumeService