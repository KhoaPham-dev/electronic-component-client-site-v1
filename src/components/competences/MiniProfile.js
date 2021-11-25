import React from 'react'
import { Avatar, Typography, Space } from 'antd'

const { Title, Text } = Typography

const MiniProfile = ({ avatar, fullName, email }) => {
    return (
        <Space>
            <Avatar size={120} src={avatar} />
            <span>
                <Title level={2}>{fullName}</Title>
                <Text>{email}</Text>
            </span>
        </Space>
    )
}

export default MiniProfile
