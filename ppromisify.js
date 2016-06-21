var ppromisify = module.exports = function(origin, scheme, parent_origin)
{
    var handler = { members_to_call: {}, gettable_properties: {}, settable_properties: {}, own_properties: {} }
    var wrapper = new Proxy(origin, handler)
    for(var key in scheme)
    {
        switch(true)
        {
            case key == "<call>":
                handler.apply_function = scheme[key](origin,parent_origin)
                handler.apply = function(target, this_arg, args)
                {
                    return handler.apply_function(args)
                }
                break
            case scheme[key] === ppromisify.readonly_property:
                handler.gettable_properties[key] = true
                break
            case scheme[key] === ppromisify.writeonly_property:
                handler.settable_properties[key] = true
                break
            case scheme[key] === ppromisify.readwrite_property:
                handler.gettable_properties[key] = true
                handler.settable_properties[key] = true
                break
            default:
                handler.members_to_call[key] = scheme[key](origin[key], origin)
        }
    }
    handler.get = function(target, name) 
    {
        if(typeof this.own_properties[name] != "undefined")
        {
            return this.own_properties[name]
        }
        if(typeof this.gettable_properties[name] != "undefined")
        {
            return origin[name]
        }
        if(typeof this.members_to_call[name] != "undefined")
        {
            return this.members_to_call[name]
        }
    }
    handler.set = function(target, name, value, receiver)
    {
        switch(true)
        {
            case this.settable_properties[name]:
                origin[name] = value
                break
            case this.members_to_call[name]:
                members_to_call[name] = value
                break
            default:
                this.own_properties[name] = value
        }
        return true
    }

    return wrapper
}

ppromisify.readonly_property  = function() { return ppromisify.readonly_property  }
ppromisify.writeonly_property = function() { return ppromisify.writeonly_property }
ppromisify.readwrite_property = function() { return ppromisify.readwrite_property }

// Returns function
//     that promisifies target_property preserving the origin context
ppromisify.property = function(scheme)
{
    return function(target_property, origin)
    {
        return ppromisify(target_property, scheme, origin)
    }
}

// Returns constructor 
//    that returns promisified wrapper of
//        new target_property(...) call.
ppromisify.constructor_return_value = function(scheme)
{
    return function(target_property, origin)
    {
        return function()
        {
            var result = ppromisify(
                new (Function.prototype.bind.apply(target_property, [null].concat(Array.prototype.slice.call(arguments)))),
                scheme
            )
            return result
        }
    }
}

// Returns function
//    that is binded to a certain context
ppromisify.function_as_is = function(target_property, origin)
{
    return target_property.bind(origin)
}

// Returns function 
//    that returns promisificated callback function(...,callback(err,res))
ppromisify.callback_err_res = function(target_property, origin)
{
    return function()
    {
        var args = Array.prototype.slice.call(arguments)
        var already_called

        return new Promise(function(resolve, reject)
        {
            args.push(function(err,res)
            {
                if(already_called == null)
                {
                    already_called = true
                    if(err != null)
                    {
                        reject(err)
                    }
                    else
                    {
                        resolve(res)
                    }
                }
            })
            try
            {
                target_property.apply(origin,args)
            }
            catch(err)
            {
                reject(err)
            }            
        })
    }
}