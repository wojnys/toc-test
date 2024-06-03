// // TODO: expand/collapse of items
// // TODO: Collapse recursively


import { ContentItem } from './types/ContentItem.ts';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { NOZ_TOC_ITEMS_MOCK } from './data/NOZ_TOC_ITEMS_MOCK.ts';

type TableOfContentsArg = {
    items: ContentItem[];
};

const loaded_items = NOZ_TOC_ITEMS_MOCK;

export const useTableOfContents = ({ items }: TableOfContentsArg) => {
    const [expandedItemIds, setExpandedItemsId] = useState<Set<string>>(new Set());
    const [keptItems, setKeptItems] =  useState<Set<ContentItem>>(new Set());

    const onClick = (item: ContentItem) => () => {
        const newExpandedItemIds = new Set(expandedItemIds);

        const newAllExpandedItems = new Set(keptItems)
        if (newExpandedItemIds.has(item.id)) {
            newExpandedItemIds.delete(item.id);

            collapseRecursively(item.id, newExpandedItemIds);
        } else {
            // Check if item has at least one children
            const childrenCount = items.filter(i => i.parentId === item.id).length;
            if (childrenCount !== 0) {
                // Add newly expanded item ID
                newExpandedItemIds.add(item.id);

                // Add newly all expanded items
                const filteredNewlyExpandedItems = items.filter(i => i.parentId === item.id);
                filteredNewlyExpandedItems.forEach(i => newAllExpandedItems.add(i));
            } else {
                return { items, expandedItemIds, onClick };
            }
        }
        setExpandedItemsId(newExpandedItemIds);
        setKeptItems(newAllExpandedItems)
    };

    const collapseRecursively = (parentId: string, expandedItemsSet: Set<string>) => {
        const childItems = Array.from(keptItems).filter(i => i.parentId === parentId);

        childItems.forEach(child => {
            expandedItemsSet.delete(child.id);
            collapseRecursively(child.id, expandedItemsSet);
        });
    }

    // Load root item
    if (keptItems.size === 0) {
        setKeptItems(new Set(items.filter(i => i.parentId === undefined)));
    }

    return { items: Array.from(keptItems), expandedItemIds, onClick };

};
