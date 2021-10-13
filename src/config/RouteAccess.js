import Config from '@config/Config';
import Mustache from 'mustache';

const {BASE_API} = Config;

const RouteAccess = {
    getApi: function (name, object){
        if (this.hasOwnProperty(name))
            return Mustache.render(this[name], object);
        return null;
    },
    ALL_MOVIES: BASE_API + '/',
};

export default RouteAccess;
