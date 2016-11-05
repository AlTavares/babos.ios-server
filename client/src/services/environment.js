import Parse from 'parse'

var Environment = {
    setup: function () {
        Parse.initialize('jmPkI2X4zgwP7M5G74y8u97tJvlCyBAe')
        Parse.serverURL = 'https://babosio.herokuapp.com/parse'
    }
}


export default Environment