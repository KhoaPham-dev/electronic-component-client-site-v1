import React from "react";
import { Link } from 'react-router-dom';
import { Breadcrumb } from "antd";

const BreadcrumbCustom = ({breadcrumbs, changeBreadcrumb}) => {

    console.log(breadcrumbs);
    console.log(changeBreadcrumb);

    return (
            <Breadcrumb className="app-breadcrumb" separator=">">
                                <Breadcrumb.Item>
                                    {/* <Link to="/">Home</Link> */}
                                    <Link onClick={() => {changeBreadcrumb([{name: ''}])}} className="routing" to={'/'}>Trang chủ</Link>
                                </Breadcrumb.Item>
                                {
                                    breadcrumbs
                                    ?
                                    breadcrumbs.map(breadcrumb => 
                                        <Breadcrumb.Item key={breadcrumb.name}>
                                            {
                                                breadcrumb.path
                                                ?
                                                    <Link className="routing" to={breadcrumb.path}>{breadcrumb.name}</Link>
                                                :
                                                    breadcrumb.name
                                            }
                                        </Breadcrumb.Item>
                                    )
                                    :
                                    null
                                }
                    
                                {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
    )

}

export default BreadcrumbCustom;