// // TODO: TableOfContents should render a hierarchical list of items

import React from 'react';
import { ContentItem } from './types/ContentItem.ts';

type TableOfContentsProps = {
    items: ContentItem[];
    expandedItemIds: Set<string>;
    onClick: (item: ContentItem) => () => void;
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items, expandedItemIds, onClick}) => {
        // Zadny filter - prochazeni pouze pres .map
        return (
            <div>
                {items.map((item) => (
                    <div key={item.id} style={{ paddingLeft: `${item.level * 30}px`,paddingTop:'1px',  cursor: 'pointer' }}>
                        <div onClick={onClick(item)} style={{ display: 'flex' }}>
                            {expandedItemIds.has(item.id) ? (
                                <div
                                    style={{
                                        backgroundColor: 'red',
                                        borderRadius: '5px',
                                        width: '40px',
                                        textAlign: 'center',
                                        margin: '0 5px',
                                    }}
                                >
                                    -
                                </div>
                            ) : (
                                <div
                                    style={{
                                        backgroundColor: 'green',
                                        borderRadius: '5px',
                                        width: '40px',
                                        textAlign: 'center',
                                        margin: '0 5px',
                                    }}
                                >
                                    +
                                </div>
                            )}
                            {item.name}
                        </div>
                    </div>
                ))}
            </div>
        );
};
