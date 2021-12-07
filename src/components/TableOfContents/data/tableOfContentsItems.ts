import { ContentItem } from '../types/ContentItem';

//? Given table of contents items
//? Order of items is important
export const tableOfContentsItems: ContentItem[] = [
    {
        id: `item_1`,
        name: `item_1`,
        level: 1,
    },
    {
        id: `item_1_1`,
        name: `item_1_1`,
        level: 2,
        parentId: `item_1`,
    },
    {
        id: `item_1_2`,
        name: `item_1_2`,
        level: 2,
        parentId: `item_1`,
    },
    {
        id: `item_2`,
        name: `item_2`,
        level: 1,
    },
    {
        id: `item_2_1`,
        name: `item_2_1`,
        level: 2,
        parentId: `item_2`,
    },
    {
        id: `item_2_1_1`,
        name: `item_2_1_1`,
        level: 3,
        parentId: `item_2_1`,
    },
    {
        id: `item_2_1_2`,
        name: `item_2_1_2`,
        level: 3,
        parentId: `item_2_1`,
    },
    {
        id: `item_2_1_2_1`,
        name: `item_2_1_2_1`,
        level: 4,
        parentId: `item_2_1_2`,
    },
    {
        id: `item_3`,
        name: `item_3`,
        level: 1,
    },
];
