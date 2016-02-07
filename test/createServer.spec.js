import test from 'tape'
import sinon from 'sinon'
import { createServer } from '../src/server'

test('createServer returns buildServer result.', t => {
    const okServerElement = {
        type: {
            buildServer() { return 'trololol' }
        }
    }

    t.equal(createServer(okServerElement), 'trololol', 'buildServer result is returned.')

    const notOkServerElement = {
        type: {
            buildServer: 'trololol'
        }
    }

    t.notOk(createServer(notOkServerElement), 'createServer returns false if buildServer is not a function.')

    t.end()
})

test('createServer recurses over children.', t => {
    let levels = 0

    const childSpy = sinon.spy()

    const serverElement = {
        type: {
            buildServer(props, parent) {
                levels++

                childSpy()

                return levels > 2 ? {} : {
                    children:  Object.assign({}, serverElement)
                }
            }
        }
    }

    createServer(serverElement)

    t.ok(childSpy.calledThrice, 'buildServer calls made for each child.')

    t.end()
})

test('parent props are passed down to children.', t => {
    let levels = 0

    const serverElement = {
        type: {
            buildServer(props, parent) {
                levels++

                return levels > 2 ? { counter: parent.counter + 1 } : {
                    counter: parent.counter + 1,
                    children:  Object.assign({}, serverElement)
                }
            }
        }
    }

    const result = createServer(serverElement, { counter: 0 })

    t.equals(
        result.children[0].children[0].counter,
        3,
        'Count increased for each recursion'
    )

    t.end()
})