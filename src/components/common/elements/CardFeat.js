import React from 'react'
import { Typography } from 'antd'

const { Title, Text } = Typography

const CardFeat = ({ title, content, img }) => {
    return (
        <div className="card-feat p-5 text-center">
            <Title className="py-6" level={2}>
                {title}
            </Title>
            <div>
                <img width="90px" src={img} />
            </div>
            <Text>{content}</Text>
        </div>
    )
}

export default CardFeat
