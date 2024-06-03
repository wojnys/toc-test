// // TODO: expand/collapse of items
// // TODO: Collapse recursively


import { ContentItem } from './types/ContentItem.ts';
import { useMemo, useState } from 'react';

type TableOfContentsArg = {
    items: ContentItem[];
};

export const useTableOfContents = ({ items }: TableOfContentsArg) => {

    // Udelal jsem tu prvni moznost - vrati nam to pouze itemy, ktere chceme zobrazit ve VIEW (neni treba nic potom filtrovat)
    // Ta druha varianta pres useMemo a odstraneni useState keptItems mi nefungovala

    const [expandedItemIds, setExpandedItemsId] = useState<Set<string>>(new Set());
    const [keptItems, setKeptItems] = useState<Set<ContentItem>>(new Set());

    const onClick = (item: ContentItem) => () => {
        const newExpandedItemIds = new Set(expandedItemIds);

        // Array of visible items
        let keptItemsResArray = Array.from(keptItems);
        if (newExpandedItemIds.has(item.id)) {
            newExpandedItemIds.delete(item.id);

            collapseRecursively(item.id, newExpandedItemIds, keptItems);
            setKeptItems(keptItems);
        } else {
            // Check if item has at least one children
            const childrenCount = items.filter(i => i.parentId === item.id).length;
            if (childrenCount !== 0) {
                // Add newly expanded item ID
                newExpandedItemIds.add(item.id);

                // Add newly all expanded items
                const filteredNewlyExpandedItems = items.filter(i => i.parentId === item.id);

                // I need to correctly insert newly expanded items behind the parent item
                const parentIdIndex = keptItemsResArray.findIndex(i => i.id === item.id);

                const firstPart = keptItemsResArray.slice(0, parentIdIndex + 1);
                const secondPart = keptItemsResArray.slice(parentIdIndex + 1);
                keptItemsResArray = [...firstPart, ...filteredNewlyExpandedItems, ...secondPart];
                setKeptItems(new Set(keptItemsResArray));
            } else {
                return { items, expandedItemIds, onClick };
            }
        }
        setExpandedItemsId(newExpandedItemIds);
    };

    const collapseRecursively = (parentId: string, expandedItemsSet: Set<string>, keptItemsSet: Set<ContentItem>) => {
        const childItems = Array.from(keptItems).filter(i => i.parentId === parentId);

        childItems.forEach(child => {
            expandedItemsSet.delete(child.id);
            keptItemsSet.delete(child);

            collapseRecursively(child.id, expandedItemsSet, keptItemsSet);
        });
    };

    // Load root items
    if (keptItems.size === 0) {
        setKeptItems(new Set(items.filter(i => i.parentId === null)));
    }

    return { items: Array.from(keptItems), expandedItemIds, onClick };


    // Zkousel jsem delat pres useMemo a odstranit state 'kepItems' - nefunguje

    // const [expandedItemIds, setExpandedItemsId] = useState<Set<string>>(new Set());
    // // const [keptItems, setKeptItems] = useState<Set<ContentItem>>(new Set());
    //
    // const keptItemsMemo = useMemo(() => {
    //     const calcVisibleItems = (expandedItemIds?: Set<string>) => {
    //         const result:any = [];
    //
    //         // Recursive function to add children to a parent
    //         const addChildren = (parent: any) => {
    //             // Find children of the parent
    //             const children = items.filter(i => i.parentId === parent.id);
    //
    //             // If there are children, add them to the parent and process their children
    //             if (children.length > 0) {
    //                 parent.children = children; // Add children to the parent item
    //                 children.forEach((child) => {
    //                     if (expandedItemIds && expandedItemIds.has(child.id)) {
    //                         addChildren(child); // Recursively add grandchildren
    //                     }
    //                 });
    //             }
    //         };
    //
    //         // Find all parent items (items with parentId as null)
    //         const parents = items.filter(i => i.parentId === null);
    //
    //         // For each parent, add its children recursively
    //         parents.forEach((parent) => {
    //             result.push(parent);
    //             if (expandedItemIds && expandedItemIds.has(parent.id)) {
    //                 addChildren(parent);
    //             }
    //         });
    //
    //         return result;
    //     }
    //     console.log(calcVisibleItems())
    //
    //     const onClick = (item: ContentItem) => () => {
    //         let resArraySet = new Set(calcVisibleItems(expandedItemIds));
    //         const newExpandedItemIds = new Set(expandedItemIds);
    //
    //         // let resArray = Array.from(keptItems);
    //         if (newExpandedItemIds.has(item.id)) {
    //             newExpandedItemIds.delete(item.id);
    //
    //             collapseRecursively(item.id, newExpandedItemIds, resArraySet);
    //             // setKeptItems(keptItems);
    //         } else {
    //             // Check if item has at least one children
    //             const childrenCount = items.filter(i => i.parentId === item.id).length;
    //             if (childrenCount !== 0) {
    //                 // Add newly expanded item ID
    //                 newExpandedItemIds.add(item.id);
    //
    //                 // Add newly all expanded items
    //                 const filteredNewlyExpandedItems = items.filter(i => i.parentId === item.id);
    //                 // resArray = Array.from(keptItems);
    //                 const parentIdIndex = Array.from(resArraySet).findIndex(i => i.id === item.id);
    //
    //                 const firstPart = Array.from(resArraySet).slice(0, parentIdIndex + 1);
    //                 const secondPart = Array.from(resArraySet).slice(parentIdIndex + 1);
    //                 const resArray = [...firstPart, ...filteredNewlyExpandedItems, ...secondPart];
    //                 console.log("resArray   ", resArray)
    //                 console.log(resArray)
    //                 resArraySet = new Set(resArray);
    //                 // resArray = [...firstPart, ...filteredNewlyExpandedItems, ...secondPart];
    //                 // setKeptItems(new Set(resArray));
    //             } else {
    //                 return { items, expandedItemIds, onClick };
    //             }
    //         }
    //         setExpandedItemsId(newExpandedItemIds);
    //     };
    //
    //     const collapseRecursively = (parentId: string, expandedItemsSet: Set<string>, resArraySet: Set<ContentItem>) => {
    //         const childItems = Array.from(resArraySet).filter(i => i.parentId === parentId);
    //
    //         childItems.forEach(child => {
    //             expandedItemsSet.delete(child.id);
    //             resArraySet.delete(child);
    //
    //             collapseRecursively(child.id, expandedItemsSet, resArraySet);
    //         });
    //     };
    //
    //     if(expandedItemIds.size === 0) {
    //         return { items: calcVisibleItems(), expandedItemIds, onClick };
    //     }
    //
    //     return { items: Array.from(resArraySet), expandedItemIds, onClick };
    // }, [items, expandedItemIds])
    //
    //
    //
    // return { items: Array.from(keptItemsMemo.items), expandedItemIds:keptItemsMemo.expandedItemIds, onClick:keptItemsMemo.onClick};

};
