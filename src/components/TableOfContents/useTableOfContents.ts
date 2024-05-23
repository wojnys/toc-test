// // TODO: expand/collapse of items
// // TODO: Collapse recursively


import { useState } from 'react';
import { ContentItem } from './types/ContentItem.ts';

type TableOfContentsArg = {
    items: ContentItem[];
};

export const useTableOfContents = ({ items }: TableOfContentsArg) => {
    const [expandedItemIds, setExpandedItemIds] = useState<Set<string>>(new Set());

    // This functions search just for items which are expanded - it is used for collapseRecursively function
    const onlyExpandedItems: ContentItem[] = [];
    const recursivelySearchForExtendedItemValues = (parentId: string, newExpandedItems: Set<string>) => {
        const filteredItems = items.filter(item => item.parentId === parentId);
        filteredItems.forEach((item) => {
            if (newExpandedItems.has(item.id)) {
                newExpandedItems.delete(item.id);
                onlyExpandedItems.push(item);
                recursivelySearchForExtendedItemValues(item.id, newExpandedItems);
            }
        });
    };


    // const memorizedExpandedItems = useMemo(() => expandedItems, [expandedItems]);
    const onClick = (item: ContentItem) => () => {
        const newExpandedItemIds = new Set(expandedItemIds);
        if (newExpandedItemIds.has(item.id)) {
            newExpandedItemIds.delete(item.id);
            recursivelySearchForExtendedItemValues(item.id, newExpandedItemIds);
            collapseRecursively(item.id, newExpandedItemIds);
        } else {
            // Check if item has at least one children
            const childrenCount = items.filter(i => i.parentId === item.id).length;
            if (childrenCount !== 0) {
                newExpandedItemIds.add(item.id);
            } else {
                return { items, expandedItemIds, onClick };
            }
        }
        setExpandedItemIds(newExpandedItemIds);
    };

    const collapseRecursively = (parentId: string, expandedSet: Set<string>) => {
        // I am using onlyExpandedItems instead of array of all items
        const childItems = onlyExpandedItems.filter(item => item.parentId === parentId);
        childItems.forEach(child => {
            expandedSet.delete(child.id);
            console.log(child.name);
            collapseRecursively(child.id, expandedSet);
        });
    };

    return { items, expandedItemIds, onClick };
};

