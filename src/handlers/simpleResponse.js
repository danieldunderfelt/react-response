export const createSimpleResponse = (renderProps = {}) => (renderTemplate, renderApp) => (req, res) => {
    renderTemplate(renderApp(renderProps, req, res), res)
}