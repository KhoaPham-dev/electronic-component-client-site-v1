import React from 'react'
import { Typography } from 'antd'
import bgTitle from '../../../assets/images/bg-title.jpeg'

const { Title } = Typography

const AppTitle = ({ title }) => {
    return (
        <div
            className="app-title"
            style={{ backgroundImage: `url('${bgTitle}')` }}
        >
            {title && <span>{title}</span>}
        </div>
    )
}

export default AppTitle
