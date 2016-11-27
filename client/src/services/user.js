
import Parse from 'parse'

var User = {
    register: function (name, email, password, callback) {
        var user = new Parse.User()
        user.set("username", email)
        user.set("password", password)
        user.set("email", email)

        // other fields can be set just like with Parse.Object
        user.set("name", name)

        user.signUp(null, {
            success: function (user) {
                // Hooray! Let them use the app now.
                callback(null, user)
            },
            error: function (user, error) {
                // Show the error message somewhere and let the user try again.
                callback(error, null)
            }
        })
    },

    login: function (email, password, callback) {
        Parse.User.logIn(email, password, {
            success: function (user) {
                callback(null, user)
                // Do stuff after successful login.
            },
            error: function (user, error) {
                // The login failed. Check error to see why.
                callback(error, null)
            }
        })
    },

    logout: function () { return Parse.User.logOut() },

    current: function () { return Parse.User.current() },

    isLogged: function () { return this.current() != null },

    getName: function () { 
        var user = this.current()
        if(user) {
            return user.get('name')
        }
        return ''
    }

}

export default User