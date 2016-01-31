export const serverBuilder = (serverElement) => {
    // Return false from build fn to not traverse its children
    if(typeof serverElement.buildServer === 'function' && serverElement.buildServer(serverElement) !== false) {
        serverElement.props.children.forEach(el => buildServer(el))
    }
}