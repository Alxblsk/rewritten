import * as React from "react"
import Translit from 'cyrillic-to-translit-js';

import './side-home.scss';


const translit = new Translit();

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
                            const latinTag = translit.transform(groupItem.tag, '-');
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
