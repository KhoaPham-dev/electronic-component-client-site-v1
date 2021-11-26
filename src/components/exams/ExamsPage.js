import React from 'react'
import { Row, Col, Button } from 'antd'
import CardFeat from '../common/elements/CardFeat'

import video from '../../assets/images/video.png'
import heartbeat from '../../assets/images/heartbeat.png'
import desktop_content from '../../assets/images/desktop_content.png'
import battery2 from '../../assets/images/battery2.png'

const list = [
    {
        title: 'Trước khi làm bài',
        content: (
            <>
                Chúng tôi khuyên bạn nên xem video dài <a href="#">2 phút</a>{' '}
                này với một số giải thích trước khi bắt đầu kiểm tra
            </>
        ),
        img: video,
    },
    {
        title: 'Làm bài',
        content: (
            <>
                Bạn sẽ phải đối mặt với một bài kiểm tra với{' '}
                <b>5 mục cho mỗi năng lực kỹ thuật số</b>. Đó là một bài kiểm
                tra tuyến tính và bạn không thể bỏ qua các câu hỏi.
            </>
        ),
        img: heartbeat,
    },
    {
        title: 'Thời gian',
        content: (
            <>
                Bài kiểm tra sẽ mất khoảng <b>30 phút </b>. Nếu bạn không hoàn
                thành bài kiểm tra, bạn sẽ có thể tiếp tục sau đó, hãy chọn lại
                nó.
            </>
        ),
        img: battery2,
    },
    {
        title: 'Kết thúc',
        content:
            'Sau khi hoàn thành bài kiểm tra, bạn có thể kiểm tra hồ sơ kỹ thuật số cập nhật của mình có trong phần cụ thể của nó trên trang web.',
        img: desktop_content,
    },
]

const ExamsPage = () => {
    return (
        <div className="py-8">
            <Row gutter={[24, 24]}>
                {list.map((el, index) => (
                    <Col xs={24} xl={6}>
                        <CardFeat key={index} {...el} />
                    </Col>
                ))}
            </Row>

            <div className="mt-8 text-center">
                <Button size="large" type="primary">
                    Bắt đầu
                </Button>
            </div>
        </div>
    )
}

export default ExamsPage
