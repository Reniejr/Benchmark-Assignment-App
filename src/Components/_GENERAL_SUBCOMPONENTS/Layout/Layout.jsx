import React, { PureComponent } from 'react'

//STYLE
import './Layout.scss'

export default class Layout extends PureComponent {
    render() {
        return (
            <div className='layout'>
                <div className="main-logo">
                    <img src="./assets/strive.png" alt=""/>
                </div>
                <div className="logo-balls">
                    <img src="./assets/strive.png" alt=""/>
                </div>
                <div className="logo-balls">
                    <img src="./assets/strive.png" alt=""/>
                </div>
                <div className="logo-balls">
                    <img src="./assets/strive.png" alt=""/>
                </div>
                <div className="logo-balls">
                    <img src="./assets/strive.png" alt=""/>
                </div>
                <div className="logo-balls">
                    <img src="./assets/strive.png" alt=""/>
                </div>
            </div>
        )
    }
}
