import React from 'react'
import { Layout, Space, Divider, Row, Col, Typography } from 'antd'
import { Link } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import { sitePathConfig } from '../../../constants/sitePathConfig'

const { Footer } = Layout
const { Text, Title } = Typography

const AppFooter = () => {
    return (
        <Footer className="app-footer">
            {/* <Row gutter={[8, 24]}>
                <Col xs={24} xl={6}>
                    <Space size={2} direction="vertical">
                        <Title level={5}>
                            <Link to={sitePathConfig.aboutUs.path}>
                                Về chúng tôi
                            </Link>
                        </Title>
                        <Text>About Pathways for Employ</Text>
                        <Text>Based on DIGCOMP</Text>
                        <Text>competences profiles</Text>
                        <Text>How does this work</Text>
                        <Text>Tecnalia R&I, certifying entity</Text>
                    </Space>
                </Col>
                <Col xs={24} xl={6}>
                    <Space size={2} direction="vertical">
                        <Title level={5}>
                            <Link to={sitePathConfig.updateProfile.path}>
                                Hồ sơ điện tử
                            </Link>
                        </Title>
                        <Text>competences profiles</Text>
                        <Text>Application help</Text>
                    </Space>
                </Col>
                <Col xs={24} xl={6}>
                    <Space className="d-block" size={2} direction="vertical">
                        <Title level={5}>
                            <Link to={sitePathConfig.exams.path}>Khảo sát</Link>
                        </Title>
                        <Text>Register</Text>
                    </Space>
                    <Space
                        className="mt-4 d-block"
                        size={2}
                        direction="vertical"
                    >
                        <Title level={5}>Assess your digital competencess</Title>
                        <Text>Test</Text>
                    </Space>
                </Col>
            </Row>
            <Divider className="my-4" /> */}
            {/* <Space size={[20, 0]}>
                <span>Liên hệ</span>
                <span>Điều khoản</span>
                <span>Chính sách Cookie</span>
            </Space> */}
            <div className="text-center">
                <Text type="secondary">
                    © Copyright 2021. All rights reserved by ...
                </Text>
            </div>
        </Footer>
    )
}

export default AppFooter
