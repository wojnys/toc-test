
// // TODO: expand/collapse of items
// // TODO: Collapse recursively


import { useEffect, useMemo, useState } from 'react';
import { ContentItem } from './types/ContentItem.ts';

type TableOfContentsArg = {
    items: ContentItem[];
};

export const useTableOfContents = ({ items }: TableOfContentsArg) => {
    const [expandedItemIds, setExpandedItems] = useState<Set<string>>(new Set());

    // This functions search just for items which are expanded - it is used for collapseRecursively function)
    const onlyExpandedItems: ContentItem[] = []
    const recursivelySearchFoeExtendedItemValues = (parentId: string, newExpandedItems: Set<string>) => {
        const filteredItems = items.filter(item => item.parentId === parentId);
        filteredItems.forEach((item) => {
            if(newExpandedItems.has(item.id)) {
                newExpandedItems.delete(item.id);
                console.log(item.name)
                onlyExpandedItems.push(item)
                recursivelySearchFoeExtendedItemValues(item.id, newExpandedItems);
            }
        })
    }

    // const memorizedExpandedItems = useMemo(() => expandedItems, [expandedItems]);
    const onClick = (item: ContentItem) => () => {
        const newExpandedItemIds = new Set(expandedItemIds);
        if (newExpandedItemIds.has(item.id)) {
            newExpandedItemIds.delete(item.id);
            recursivelySearchFoeExtendedItemValues(item.id, newExpandedItemIds);
            collapseRecursively(item.id, newExpandedItemIds);
        } else {
            // Check if item has at least one children
            const children_count = items.filter(i => i.parentId === item.id).length;
            if(children_count !== 0) {
                newExpandedItemIds.add(item.id);
            } else {
                return {items, expandedItemIds, onClick };
            }
        }
        setExpandedItems(newExpandedItemIds);
    };

    const collapseRecursively = (parentId: string, expandedSet: Set<string>) => {
        // I am using onlyExpandedItems (Just Expanded items) instead of items -> I need to go through all the items -> also items which are not expanded I will check
        const childItems = onlyExpandedItems.filter(item => item.parentId === parentId);
        childItems.forEach(child => {
            expandedSet.delete(child.id);
            console.log(child.name)
            collapseRecursively(child.id, expandedSet);
        })
    };

    return {items, expandedItemIds, onClick };
};

