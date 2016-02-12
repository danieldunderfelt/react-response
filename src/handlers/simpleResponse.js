import { createTemplateString } from '../utils/createTemplateString'

export const createSimpleResponse = (renderProps = {}) => (Template, templatePropsProvider) => (req, res) => {
    const templateProps = templatePropsProvider(renderProps, req, res)
    res.status(200).send(createTemplateString(templateProps, Template))
}