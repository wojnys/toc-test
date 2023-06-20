import { ContentItem } from './types/ContentItem.ts';

type TableOfContentsArg = {
    items: ContentItem[];
};

// TODO: expand/collapse of items
// TODO: Collapse recursively
export const useTableOfContents = ({ items }: TableOfContentsArg) => {
    const onClick = (item: ContentItem) => () => console.log(item);

    return { items, onClick };
};
