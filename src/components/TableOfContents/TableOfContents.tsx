// // TODO: TableOfContents should render a hierarchical list of items

import React from 'react';
import { ContentItem } from './types/ContentItem.ts';

type TableOfContentsProps = {
    items: ContentItem[];
    expandedItemIds: Set<string>;
    onClick: (item: ContentItem) => () => void;
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items, expandedItemIds, onClick}) => {
    // const memoizedExpandedItemIds = useMemo(() => expandedItemIds, [expandedItemIds]);


    const renderItems = (parentId: string | undefined, level: number) => {
        const filteredItems = items.filter((item) => item.parentId === parentId);

        return (
            <div>
                {filteredItems.map((item) => (
                    <div key={item.id} style={{ paddingLeft: `${level * 20}px`, cursor: 'pointer' }}>
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
                        {expandedItemIds.has(item.id) && renderItems(item.id,level+1)}
                    </div>
                ))}
            </div>
        );
    };

    return <div>{renderItems(undefined, 1)}</div>;
};
