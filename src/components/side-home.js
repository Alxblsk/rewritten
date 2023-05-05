import * as React from "react"

import { latinizeTag } from './utils/latinize.js';
import './side-home.scss';

const SideHome = (props) => {
    const { categories } = props;
    const { tags, title } = categories;

    return (
        <div className="page-side">
            <div className="side-section">
                <h3 className="side-section-title">{ title }</h3>
                <ul className="tags-list">
                    {
                        tags.map(groupItem => {
                            const latinTag = latinizeTag(groupItem.tag);
                            return (
                                <li className="tags-item" data-count={groupItem.totalCount}>
                                    #<a href={`/be/tags/${latinTag}/`}>{groupItem.tag}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </div>
    )
}

export default SideHome
