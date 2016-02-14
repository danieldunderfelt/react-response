export const createSimpleResponse = (renderProps = {}) => (renderResponse, renderFunction) => (req, res) => {
    renderResponse(renderFunction(renderProps, req, res), res)
}