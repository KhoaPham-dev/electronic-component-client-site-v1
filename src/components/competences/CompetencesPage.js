import React from 'react'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const CompetencesPage = () => {
    return (
        <div className="competences-content mt-6">
            <Tabs size="large" type="card" defaultActiveKey="1">
                <TabPane
                    className="p-6  competences-tab-content"
                    tab="Bài kiểm tra đã thực hiện"
                    key="1"
                >
                    Bài kiểm tra đã thực hiện
                </TabPane>
                <TabPane
                    className="p-6  competences-tab-content"
                    tab="Hồ sơ kỹ thuật số"
                    key="2"
                >
                    Hồ sơ kỹ thuật số
                </TabPane>
                <TabPane
                    className="p-6  competences-tab-content"
                    tab="Hồ sơ năng lực"
                    key="3"
                >
                    Hồ sơ năng lực
                </TabPane>
            </Tabs>
        </div>
    )
}

export default CompetencesPage
