// import { FC } from 'react';
// import { useTableOfContents } from './useTableOfContents.ts';
//
// type TableOfContentsProps = ReturnType<typeof useTableOfContents>;
//
// // TODO: TableOfContents should render a hierarchical list of items
// //  item_1
// //      item_1_1
// //          item_1_1_1
// //      item_1_2
// //  item_2
// //  item_3
// //      item_3_1
// //  item_4
//
// export const TableOfContents: FC<TableOfContentsProps> = ({ items, onClick }) => (
//     <div>
//         {items.map((item) => (
//             <div key={item.id} style={{ display: 'flex' }}>
//                 <div style={{ width: item.level * 20, height: 10 }} />
//                 <button onClick={onClick(item)}>{item.name}</button>
//             </div>
//         ))}
//     </div>
// );

import React, { useMemo } from 'react';
import { ContentItem } from './types/ContentItem.ts';

type TableOfContentsProps = {
    items: ContentItem[];
    expandedItemIds: Set<string>;
    onClick: (item: ContentItem) => () => void;
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items, expandedItemIds, onClick }) => {

    const memoizedItems = useMemo(() => items, [items]);
    const memoizedExpandedItemIds = useMemo(() => expandedItemIds, [expandedItemIds]);
    console.log(memoizedItems);

    const renderItems = (parentId: string | undefined, level: number) => {
        const filteredItems = memoizedItems.filter(item => item.parentId === parentId);
        console.log(filteredItems);
        return (
            <div>
                {filteredItems.map(item => (
                    <div key={item.id} style={{ paddingLeft: `${level * 20}px`, cursor: 'pointer' }}>
                        <div onClick={onClick(item)} style={{ display: 'flex' }}>
                            {memoizedExpandedItemIds.has(item.id) ? <div style={{
                                    backgroundColor: 'red',
                                    borderRadius: '5px',
                                    width: '40px',
                                    textAlign: 'center',
                                    margin: '0 5px',
                                }}>-</div> :
                                <div style={{
                                    backgroundColor: 'green',
                                    borderRadius: '5px',
                                    width: '40px',
                                    textAlign: 'center',
                                    margin: '0 5px',
                                }}>+</div>} {item.name}
                        </div>
                        {memoizedExpandedItemIds.has(item.id) && renderItems(item.id, level + 1)}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            {renderItems(undefined, 1)}
        </div>
    );
};
