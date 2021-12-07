import { tableOfContentsItems } from './data/tableOfContentsItems';
import { useTableOfContents } from './useTableOfContents';
import { act, renderHook } from '@testing-library/react-hooks';

describe(`useTableOfContents`, () => {
    it(`Should return first level by default`, () => {
        const items = tableOfContentsItems;
        const { result } = renderHook(() => useTableOfContents({ items: tableOfContentsItems }));
        const firstLevel = items.filter((item) => item.level === 1);

        expect(result.current.items).toEqual(firstLevel);
    });

    it(`Should toggle item`, () => {
        const items = tableOfContentsItems;
        const item = items.find(({ id }) => id === `item_1`);

        if (item) {
            const { result } = renderHook(() => useTableOfContents({ items: tableOfContentsItems }));

            act(() => {
                result.current.onClick(item);
            });

            const otherFirstLevelItems = items.filter((item) => item.level === 1 && item.id !== item.id);
            const subItems = items.filter((item) => item.parentId === item.id);
            const expectedExpanded = [item, ...subItems, ...otherFirstLevelItems];

            expect(result.current.items).toEqual(expectedExpanded);

            act(() => {
                result.current.onClick(item);
            });

            const expectedCollapsed = items.filter((item) => item.level === 1);
            expect(result.current.items).toEqual(expectedCollapsed);
        }
    });

    it(`Should collapse recursively`, () => {
        const items = tableOfContentsItems;
        const firstLevelItem = items.find(({ id }) => id === `item_2`);
        const secondLevelItem = items.find(({ id }) => id === `item_2_1`);
        const thirdLevelItem = items.find(({ id }) => id === `item_2_1_2`);

        const { result } = renderHook(() => useTableOfContents({ items: tableOfContentsItems }));

        //? Expand multiple levels
        act(() => {
            if (firstLevelItem) result.current.onClick(firstLevelItem);
        });

        act(() => {
            if (secondLevelItem) result.current.onClick(secondLevelItem);
        });

        act(() => {
            if (thirdLevelItem) result.current.onClick(thirdLevelItem);
        });

        //? Collapse root levels
        act(() => {
            if (firstLevelItem) result.current.onClick(firstLevelItem);
        });

        const expectedFirstLevel = items.filter((item) => item.level === 1);
        expect(result.current.items).toEqual(expectedFirstLevel);
    });
});
