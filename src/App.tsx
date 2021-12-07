import React from 'react';
import { TableOfContents } from './components/TableOfContents/TableOfContents';
import { useTableOfContents } from './components/TableOfContents/useTableOfContents';
import { tableOfContentsItems } from './components/TableOfContents/data/tableOfContentsItems';

const App = () => {
    const items = tableOfContentsItems;
    const props = useTableOfContents({ items });

    return (
        <div>
            <TableOfContents {...props} />
        </div>
    );
};

export default App;
