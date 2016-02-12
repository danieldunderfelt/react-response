import React from 'react'

class ReactResponseGreeter extends React.Component {

    render() {

        return (
            <div style={{
                padding: '2em',
                width: '50%',
                maxWidth: '600px'
            }}>
                <h1 style={{
                    fontFamily: 'Arial',
                    fontSize: '5em',
                    color: '#00BFFF'
                }}>
                    Hello world from React Response!
                </h1>
                <p>
                    You're almost there! To render your own app instead of this
                    Hello World page, pass the root component of your app as a
                    child to the Response component.
                </p>
            </div>
        )
    }
}

export default ReactResponseGreeter