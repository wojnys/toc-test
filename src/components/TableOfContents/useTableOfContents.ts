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

    const [allItems, setAllItems] = useState<ContentItem[]>(loaded_items);
    useEffect(() => {
        console.log("ALL ITEMS LOADED")
        console.log(allItems)
    }, [])

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

    const [expandedItemIds, setExpandedItemsId] = useState<Set<string>>(new Set());
    const [keptItems, setKeptItems] =  useState<Set<ContentItem>>(new Set());

    const onClick = (item: ContentItem) => () => {
        const newExpandedItemIds = new Set(expandedItemIds);

        const newItems = new Set(keptItems)
        if (newExpandedItemIds.has(item.id)) {
            newExpandedItemIds.delete(item.id);

            recursivelySearchForExtendedItemValues(item.id, newExpandedItemIds);
            collapseRecursively(item.id, newExpandedItemIds);

        } else {
            // Check if item has at least one children
            const childrenCount = items.filter(i => i.parentId === item.id).length;
            if (childrenCount !== 0) {
                newExpandedItemIds.add(item.id);

                const filteredNewlyExpandedItems = allItems.filter(i => i.parentId === item.id);
                filteredNewlyExpandedItems.forEach(i => newItems.add(i));
            } else {
                return { items, expandedItemIds, onClick };
            }
        }
        setExpandedItemsId(newExpandedItemIds);
        setKeptItems(newItems)
    };

    let itemsToRemove: string[] = [];
    const collapseRecursively = (parentId: string, expandedItemsSet: Set<string>) => {
        const childItems = onlyExpandedItems.filter(i => i.parentId === parentId);

        itemsToRemove.push(parentId);
        childItems.forEach(child => {
            expandedItemsSet.delete(child.id);
            collapseRecursively(child.id, expandedItemsSet);
        });
    }


    // Load root item
    if (keptItems.size === 0) {
        setKeptItems(new Set(allItems.filter(i => i.parentId === undefined)));
    }

    return { items: Array.from(keptItems), expandedItemIds, onClick };

};
