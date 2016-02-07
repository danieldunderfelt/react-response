export const createServer = (serverElement, parent = {}) => {

    if(typeof serverElement.type.buildServer === 'function') {
        const serverComponents = serverElement.type.buildServer(serverElement.props, parent)

        const nextParent = Object.assign(
            {},
            parent,
            serverComponents,
            { children: false } // It is not necessary to carry child React Elements here.
        )

        if(typeof serverComponents.children !== "undefined") {

            let children = serverComponents.children

            if(serverComponents.children instanceof Array === false) {
                children = [serverComponents.children]
            }

            serverComponents.children = children.map(el => createServer(el, nextParent))
        }

        return serverComponents
    }

    return false
}