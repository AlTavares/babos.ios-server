import Parse from 'parse'
import $ from 'jquery'

var Environment = {
    setup: function () {
        Parse.initialize('jmPkI2X4zgwP7M5G74y8u97tJvlCyBAe')
        Parse.serverURL = 'https://babosio.herokuapp.com/parse'
        window.jQuery = window.$ = $
    },
    lang: 'pt'
}


export default Environment