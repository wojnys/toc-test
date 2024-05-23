//? Given data type
export type ContentItem = {
    id: string;
    level: number;
    name: string;
    parentId?: string | null;
    __typename?: string;
    isExpanded?: boolean;
};
